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
    Business: Send contact form messages to ivan@elkin.pro via email
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
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        
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
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Failed to send email', 'details': str(e)}),
            'isBase64Encoded': False
        }