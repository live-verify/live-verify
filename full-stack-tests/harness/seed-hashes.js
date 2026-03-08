const fs = require('fs');
const http = require('http');

const data = JSON.parse(fs.readFileSync('full-stack-tests/harness/test-data.json', 'utf8'));

async function seed() {
    for (const [hash, val] of Object.entries(data.seed)) {
        await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: '127.0.0.1',
                port: 9090,
                path: `/v/${hash}`,
                method: 'PUT'
            }, (res) => {
                res.on('data', () => {});
                res.on('end', resolve);
            });
            req.on('error', reject);
            req.write(val);
            req.end();
        });
        console.log(`  Seeded ${hash}`);
    }
}

seed().then(() => {
    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
