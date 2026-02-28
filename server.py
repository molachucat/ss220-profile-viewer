import http.server
import socketserver
import socket

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    ip = socket.gethostbyname(socket.gethostname())
    print(f"Сервер запущен!")
    print(f"Открой в браузере:")
    print(f"http://localhost:{PORT}")
    print(f"http://{ip}:{PORT}  (для устройств в локальной сети)")
    httpd.serve_forever()
