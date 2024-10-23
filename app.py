# app.py
from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
import time
from datetime import datetime, timedelta

app = Flask(__name__)
socketio = SocketIO(app)

# Simulace jednoduché databáze
users = []
coffee_logs = []
tasks = []

@app.route('/')
def index():
    return render_template('index.html')

# API pro registraci uživatele pomocí QR kódu
@app.route('/register', methods=['POST'])
def register():
    user = request.json['username']
    if user not in users:
        users.append({'username': user, 'registered_at': datetime.now()})
        return jsonify({'status': 'registered', 'username': user}), 200
    return jsonify({'status': 'exists'}), 400

# API pro přidání konzumace kávy
@app.route('/add_coffee', methods=['POST'])
def add_coffee():
    data = request.json
    coffee_logs.append({
        'username': data['username'],
        'coffee_type': data['coffee_type'],
        'amount': data['amount'],
        'time': datetime.now()
    })
    # Odeslání aktualizace na všechny klienty
    socketio.emit('update_coffee', coffee_logs, broadcast=True)
    return jsonify({'status': 'ok'}), 200

# WebSocket událost pro přehled kávy v reálném čase
@socketio.on('connect')
def handle_connect():
    emit('update_coffee', coffee_logs)

# Odesílání notifikací pro úkoly (čištění, doplnění atd.)
@socketio.on('new_task')
def new_task(data):
    tasks.append({
        'task_type': data['task_type'],
        'assigned_to': None,
        'created_at': datetime.now(),
        'status': 'pending'
    })
    emit('update_tasks', tasks, broadcast=True)

# Worker pro automatické upozornění (push notifikace)
@socketio.on('task_update')
def task_update(data):
    task = next((t for t in tasks if t['task_type'] == data['task_type']), None)
    if task:
        task['assigned_to'] = data['assigned_to']
        task['status'] = data['status']
        emit('update_tasks', tasks, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
