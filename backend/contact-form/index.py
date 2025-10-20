import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, ValidationError


class ContactFormRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send contact form messages to ivan@elkin.pro via email with updated SMTP credentials
    Args: event - dict with httpMethod, body (JSON with name, email, message)
          context - object with request_id, function_name attributes
    Returns: HTTP response with status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    try:
        form_data = ContactFormRequest(**body_data)
    except ValidationError as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Validation error', 'details': e.errors()}),
            'isBase64Encoded': False
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    print(f"SMTP Config - Host: {smtp_host}, Port: {smtp_port}, User: {smtp_user}, Pass exists: {bool(smtp_password)}")
    
    if not all([smtp_host, smtp_user, smtp_password]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'SMTP configuration incomplete',
                'details': f'Missing: {[k for k, v in {"SMTP_HOST": smtp_host, "SMTP_USER": smtp_user, "SMTP_PASSWORD": smtp_password}.items() if not v]}'
            }),
            'isBase64Encoded': False
        }
    
    recipient_email = 'ivan@elkin.pro'
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новое сообщение от {form_data.name}'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Reply-To'] = form_data.email
    
    text_content = f"""
Новое сообщение с сайта-резюме:

Имя: {form_data.name}
Email: {form_data.email}

Сообщение:
{form_data.message}
"""
    
    message_html = form_data.message.replace('\n', '<br>')
    html_content = f"""
<html>
<head></head>
<body>
    <h2>Новое сообщение с сайта-резюме</h2>
    <p><strong>Имя:</strong> {form_data.name}</p>
    <p><strong>Email:</strong> <a href="mailto:{form_data.email}">{form_data.email}</a></p>
    <h3>Сообщение:</h3>
    <p>{message_html}</p>
</body>
</html>
"""
    
    part1 = MIMEText(text_content, 'plain')
    part2 = MIMEText(html_content, 'html')
    
    msg.attach(part1)
    msg.attach(part2)
    
    try:
        print(f"Attempting to connect to {smtp_host}:{smtp_port}")
        
        if smtp_port == 465:
            print("Using SMTP_SSL for port 465")
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
                print("Connected via SSL, attempting login")
                server.login(smtp_user, smtp_password)
                print("Login successful, sending message")
                server.send_message(msg)
                print("Message sent successfully")
        else:
            print("Using SMTP with STARTTLS")
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.set_debuglevel(1)
                print("Connected, starting TLS")
                server.starttls()
                print("TLS started, attempting login")
                server.login(smtp_user, smtp_password)
                print("Login successful, sending message")
                server.send_message(msg)
                print("Message sent successfully")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Email sent successfully'}),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"Error sending email: {type(e).__name__}: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Failed to send email', 'details': str(e), 'type': type(e).__name__}),
            'isBase64Encoded': False
        }