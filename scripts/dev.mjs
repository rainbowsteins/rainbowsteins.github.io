import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
if (!process.argv.includes('--production')) await import('./build.mjs');
const root = resolve('dist');
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.json': 'application/json' };
const server = createServer(async (req,res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root + sep)) { res.writeHead(403);res.end();return; }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });res.end(data);
  } catch { res.writeHead(404);res.end('Not found'); }
});
server.listen(port, '0.0.0.0', () => console.log(`Local: http://localhost:${port}`));
const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);process.on('SIGINT', shutdown);
