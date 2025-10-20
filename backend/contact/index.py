import json
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, ValidationError

class ContactRequest(BaseModel):
    '''
    Модель данных формы обратной связи
    '''
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=1000)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обработка формы обратной связи (сохранение в лог)
    Args: event - dict с httpMethod, body, headers
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    contact = ContactRequest(**body_data)
    
    print(f"[CONTACT FORM] Request ID: {context.request_id}")
    print(f"[CONTACT FORM] Name: {contact.name}")
    print(f"[CONTACT FORM] Email: {contact.email}")
    print(f"[CONTACT FORM] Message: {contact.message}")
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': 'Message received successfully',
            'request_id': context.request_id
        })
    }
