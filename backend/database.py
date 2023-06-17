import os
import psycopg2 as psy
from dotenv import load_dotenv

load_dotenv()


conn= psy.connect(
        host="localhost",
        database="test_empiler",
        user="postgres",
        password=os.getenv('DB_PASSWORD')
        )