from flask import Flask, render_template, request, redirect, url_for
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__)

# Database connection parameters
DATABASE_URL = os.getenv('DATABASE_URL', 'postgres://default:HNmMDLBtW37u@ep-yellow-flower-a45dym8j.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require')

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name = request.form['name']
        month_of_birth = request.form['month_of_birth']
        day_of_birth = request.form['day_of_birth']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO birthdays (name, month_of_birth, day_of_birth) VALUES (%s, %s, %s)',
                       (name, month_of_birth, day_of_birth))
        conn.commit()
        cursor.close()
        conn.close()

        return redirect(url_for('index'))

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM birthdays')
    birthdays = cursor.fetchall()
    cursor.close()
    conn.close()

    return render_template('index.html', birthdays=birthdays)

if __name__ == '__main__':
    app.run(debug=True)
