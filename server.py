import base64
import hashlib
from io import BytesIO
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
SCRIPT = ROOT / "js/script.js"
SCRIPT_HASH = base64.b64encode(hashlib.sha256(SCRIPT.read_bytes()).digest()).decode("ascii")
HTML = (ROOT / "index.html").read_text(encoding="utf-8").replace(
    'src="js/script.js"', f'src="js/script.js" integrity="sha256-{SCRIPT_HASH}"'
).encode("utf-8")
POLICY = (
    "default-src 'none'; "
    f"script-src 'sha256-{SCRIPT_HASH}' 'strict-dynamic'; "
    "style-src 'self'; img-src 'self'; object-src 'none'; "
    "base-uri 'none'; form-action 'none'; frame-ancestors 'none'; "
    "require-trusted-types-for 'script'; trusted-types 'none'"
)
PUBLIC_PATHS = {"/", "/index.html", "/css/style.css", "/js/script.js"}
PUBLIC_PATHS.update(f"/images/{image.name}" for image in (ROOT / "images").glob("*.webp"))


class ExhibitionHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_head(self):
        path = urlsplit(self.path).path
        if path in {"/", "/index.html"}:
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(HTML)))
            self.end_headers()
            return BytesIO(HTML)

        if path not in PUBLIC_PATHS:
            self.send_error(404)
            return None

        return super().send_head()

    def end_headers(self):
        self.send_header("Content-Security-Policy", POLICY)
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("X-Content-Type-Options", "nosniff")

        # cloudflared reports the visitor protocol to the loopback origin.
        if self.headers.get("X-Forwarded-Proto", "").lower() == "https":
            self.send_header("Strict-Transport-Security", "max-age=31536000")

        super().end_headers()


if __name__ == "__main__":
    with ThreadingHTTPServer(("127.0.0.1", 8000), ExhibitionHandler) as server:
        print("http://127.0.0.1:8000")
        server.serve_forever()
