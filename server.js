import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');
// Fallback para __dirname apenas se a pasta dist ainda não existir, mas bloqueando arquivos sensíveis
const ROOT = fs.existsSync(DIST_DIR) ? DIST_DIR : __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
};

const BLOCKED_FILES = new Set([
  'server.js',
  'package.json',
  'package-lock.json',
  'vite.config.js',
]);

const server = http.createServer((req, res) => {
  // 1. Restrição de métodos HTTP (A05 - Security Misconfiguration)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, {
      ...SECURITY_HEADERS,
      Allow: 'GET, HEAD',
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('Método Não Permitido: 405');
    return;
  }

  // 2. Decodificação segura de URL contra URIError DoS (A04/A05)
  let reqPath;
  try {
    const rawPath = (req.url || '/').split('?')[0];
    reqPath = decodeURIComponent(rawPath);
  } catch {
    res.writeHead(400, {
      ...SECURITY_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('Requisição Inválida: 400');
    return;
  }

  if (reqPath.includes('\0')) {
    res.writeHead(400, {
      ...SECURITY_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('Requisição Inválida: 400');
    return;
  }

  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // 3. Prevenção rigorosa de Path Traversal e dotfiles (A01 - Broken Access Control)
  const safeRelPath = reqPath.replace(/^[/\\]+/, '');
  const filePath = path.resolve(ROOT, safeRelPath);
  const relative = path.relative(ROOT, filePath);

  const isOutsideRoot =
    relative.startsWith('..') || path.isAbsolute(relative);
  const hasHiddenSegment = relative
    .split(path.sep)
    .some((part) => part.startsWith('.'));
  const isBlockedFile =
    ROOT === __dirname &&
    (BLOCKED_FILES.has(relative) ||
      relative.startsWith(`src${path.sep}`) ||
      relative.startsWith(`scripts${path.sep}`) ||
      relative.startsWith(`node_modules${path.sep}`));

  if (isOutsideRoot || hasHiddenSegment || isBlockedFile) {
    console.warn(`[SECURITY] Acesso negado (403): ${req.method} ${reqPath}`);
    res.writeHead(403, {
      ...SECURITY_HEADERS,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    res.end('Acesso Negado');
    return;
  }

  // 4. Verificação do arquivo e envio via Stream com tratamento de erros
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {
        ...SECURITY_HEADERS,
        'Content-Type': 'text/plain; charset=utf-8',
      });
      res.end('Arquivo Não Encontrado: 404');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    });

    if (req.method === 'HEAD') {
      res.end();
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', (streamErr) => {
      console.error(`[ERROR] Falha ao ler arquivo ${filePath}:`, streamErr.message);
      if (!res.headersSent) {
        res.writeHead(500, {
          ...SECURITY_HEADERS,
          'Content-Type': 'text/plain; charset=utf-8',
        });
      }
      res.end();
    });

    res.on('close', () => {
      stream.destroy();
    });

    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor Arborização Inteligente rodando em: http://localhost:${PORT}`);
});
