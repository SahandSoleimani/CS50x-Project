from flask import Flask, render_template, request, redirect, url_for
import psycopg2
from psycopg2.extras import RealDictCursor
import os

app = Flask(__name__, static_folder='static', static_url_path='/static')

# Database connection parameters
DATABASE_URL = os.getenv('DATABASE_URL')

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        score = request.form['score']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('INSERT INTO scores (score) VALUES (%s)', (score))
        conn.commit()
        cursor.close()
        conn.close()

        return render_template("result.html", score=score)
    
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)