import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage product reviews - get, create, approve, reject
    Args: event with httpMethod, body, queryStringParameters
    Returns: HTTP response with reviews data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            status = params.get('status', 'approved')
            admin = params.get('admin', 'false') == 'true'
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                if admin:
                    cur.execute(
                        "SELECT id, name, rating, comment, created_at, status FROM reviews ORDER BY created_at DESC"
                    )
                else:
                    cur.execute(
                        "SELECT id, name, rating, comment, created_at FROM reviews WHERE status = %s ORDER BY created_at DESC",
                        (status,)
                    )
                
                reviews = cur.fetchall()
                
                for review in reviews:
                    if review.get('created_at'):
                        review['created_at'] = review['created_at'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'reviews': reviews}),
                    'isBase64Encoded': False
                }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            name = body_data.get('name', '').strip()
            rating = body_data.get('rating', 5)
            comment = body_data.get('comment', '').strip()
            
            if not name or not comment:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Name and comment are required'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "INSERT INTO reviews (name, rating, comment, status) VALUES (%s, %s, %s, 'pending') RETURNING id, name, rating, comment, created_at, status",
                    (name, rating, comment)
                )
                review = cur.fetchone()
                conn.commit()
                
                if review.get('created_at'):
                    review['created_at'] = review['created_at'].isoformat()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'review': review}),
                    'isBase64Encoded': False
                }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            review_id = body_data.get('id')
            new_status = body_data.get('status')
            
            if not review_id or new_status not in ['approved', 'rejected', 'pending']:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Invalid review ID or status'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "UPDATE reviews SET status = %s WHERE id = %s RETURNING id, name, rating, comment, created_at, status",
                    (new_status, review_id)
                )
                review = cur.fetchone()
                conn.commit()
                
                if not review:
                    return {
                        'statusCode': 404,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Review not found'}),
                        'isBase64Encoded': False
                    }
                
                if review.get('created_at'):
                    review['created_at'] = review['created_at'].isoformat()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'review': review}),
                    'isBase64Encoded': False
                }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            review_id = params.get('id')
            
            if not review_id:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Review ID is required'}),
                    'isBase64Encoded': False
                }
            
            with conn.cursor() as cur:
                cur.execute("DELETE FROM reviews WHERE id = %s", (review_id,))
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()
