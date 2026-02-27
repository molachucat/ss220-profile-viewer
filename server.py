# server.py
# pip install flask
from flask import Flask, request
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__, static_folder='.', static_url_path='')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    # отдаёт index.html (статический файл из текущей папки)
    return app.send_static_file('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'Файл не найден в запросе', 400
    f = request.files['file']
    if f.filename == '':
        return 'Пустое имя файла', 400

    filename = secure_filename(f.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    f.save(save_path)
    return 'OK', 200

if __name__ == '__main__':
    # Доступно в локальной сети: http://<your-ip>:8000
    app.run(host='0.0.0.0', port=8000, debug=True)
