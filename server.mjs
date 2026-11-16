import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";

const files = new Map([
  ["/index.html", "text/html; charset=utf-8"],
  ["/css/style.css", "text/css; charset=utf-8"],
  ["/js/script.js", "text/javascript; charset=utf-8"],
  ["/favicon.ico", "image/x-icon"],
]);

for (const image of await readdir(new URL("./images/", import.meta.url), { withFileTypes: true })) {
  if (image.isFile() && image.name.endsWith(".webp")) {
    files.set("/images/" + image.name, "image/webp");
  }
}

createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD", "Cache-Control": "no-store" });
    response.end();
    return;
  }

  const pathname = request.url.split("?")[0];
  const path = pathname === "/" ? "/index.html" : pathname;
  const type = files.get(path);
  if (!type) {
    response.writeHead(404, { "Cache-Control": "no-store" });
    response.end();
    return;
  }

  try {
    const body = await readFile(new URL("." + path, import.meta.url));
    response.writeHead(200, {
      "Content-Type": type,
      "Content-Length": body.length,
      "Cache-Control": path === "/index.html" ? "no-cache" : "public, max-age=2592000",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500, { "Cache-Control": "no-store" });
    response.end();
  }
}).listen(8000, "127.0.0.1", () => console.log("http://127.0.0.1:8000/"));
