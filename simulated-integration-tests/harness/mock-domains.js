const http = require('http');
const fs = require('fs');
const path = require('path');

const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'test-data.json'), 'utf8'));

const PORT = 8002;

const domains = {
    'gov.uk': {
        '/authorized/verification-meta.json': testData.govMeta
    },
    'hmicfrs.justiceinspectorates.gov.uk': {
        '/auth/verification-meta.json': testData.hmicfrsMeta
    },
    'midsomer.police.uk': {
        '/v1/verification-meta.json': testData.midsomerMeta
    },
    '127.0.0.1': {
        '/authorized/verification-meta.json': testData.govMeta,
        '/auth/verification-meta.json': testData.hmicfrsMeta,
        '/v1/verification-meta.json': testData.midsomerMeta
    }
};

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/healthz') {
        res.writeHead(200);
        res.end('ok');
        return;
    }

    const host = req.headers.host ? req.headers.host.split(':')[0] : '';
    const url = req.url;

    console.log(`[MockServer] ${req.method} ${host}${url}`);

    if (url.startsWith('/fixtures/')) {
        const fixturePath = path.join(__dirname, '..', 'fixtures', url.substring(10));
        if (fs.existsSync(fixturePath) && fs.lstatSync(fixturePath).isFile()) {
            const ext = path.extname(fixturePath);
            const contentType = {
                '.html': 'text/html',
                '.png': 'image/png',
                '.json': 'application/json'
            }[ext] || 'application/octet-stream';
            
            res.writeHead(200, { 'Content-Type': contentType });
            fs.createReadStream(fixturePath).pipe(res);
            return;
        }
    }

    if (domains[host] && domains[host][url]) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(domains[host][url]));
        return;
    }

    const parts = url.split('/');
    const lastSegment = parts[parts.length - 1].split('?')[0];
    if (lastSegment.length === 64 && /^[0-9a-f]{64}$/.test(lastSegment)) {
        console.log(`[MockServer] Proxying hash check for ${lastSegment}`);
        const proxyReq = http.request(`http://127.0.0.1:8081/v/${lastSegment}`, {
            method: 'GET'
        }, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        proxyReq.on('error', (e) => {
            console.error(`[MockServer] Proxy error: ${e.message}`);
            res.writeHead(502);
            res.end('Upstream error');
        });
        proxyReq.end();
        return;
    }

    res.writeHead(404);
    res.end('Not found');
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Mock domains server listening on http://127.0.0.1:${PORT}`);
});