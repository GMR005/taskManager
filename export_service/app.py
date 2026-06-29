import psycopg2
import csv
import io
import os
from datetime import datetime
from flask import Flask, Response, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DB_PARAMS = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', 5432),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', ''),
    'dbname': os.getenv('DB_NAME', 'taskmanager'),
}


def get_conn():
    return psycopg2.connect(**DB_PARAMS)


@app.route('/export', methods=['GET'])
def export_tasks():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, title, description, status, priority, category, user_id, created_at
        FROM tasks
        ORDER BY created_at DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(['id', 'title', 'description', 'status', 'priority', 'category', 'user_id', 'created_at'])
    writer.writerows(rows)

    output = buffer.getvalue()
    filename = f'tasks_export_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'

    return Response(
        output,
        mimetype='text/csv',
        headers={'Content-Disposition': f'attachment; filename={filename}'},
    )
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
