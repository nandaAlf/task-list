import sqlite3

conn = sqlite3.connect("task_api.db")
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tablas en la base de datos:", tables)
conn.close()
