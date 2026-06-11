import psycopg2
import csv
import os                                
from datetime import datetime
from dotenv import load_dotenv

load_dotenv('backend/.env')

conn = psycopg2.connect(
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', 5432),
    user=os.getenv('DB_USER', 'postgres'),
    password=os.getenv('DB_PASSWORD', ''),
    database=os.getenv('DB_NAME', 'taskmanager')
)

cur = conn.cursor()

cur.execute('SELECT id, title, description, status, created_at FROM tasks ORDER BY created_at DESC')
rows = cur.fetchall()                    

filename = f'tasks_export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'  

with open(filename, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['id', 'title', 'description', 'status', 'created_at'])
    writer.writerows(rows)

cur.close()
conn.close()
print("Экспорт завершен!")