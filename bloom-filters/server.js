const http = require('http');
const { Pool } = require('pg');
const { URL } = require('url');
const { BloomFilter } = require('./bloom-filter');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 20000,
});

const bloom = new BloomFilter(1000000, 0.01);

async function loadUsernamesIntoBloom() {
    try {
        const result = await pool.query('SELECT name FROM students');
        result.rows.forEach(row => bloom.add(row.name)); 
        console.log(`Loaded ${result.rowCount} usernames into Bloom filter`);
    } catch (err) {
        console.error('Error loading usernames:', err);
    }
}

loadUsernamesIntoBloom(); 

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const method = req.method;

    if (method === 'GET' && pathname === '/search') {
        const username = url.searchParams.get('username');
        if (!username) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username query parameter is required' }));
            return;
        }
        try {
            const result = await pool.query('SELECT 1 FROM students WHERE name=$1 LIMIT 1', [username]); 
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ exists: result.rowCount > 0 }));
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    }
    else if (method === 'GET' && pathname === '/search-bloom') {
        const username = url.searchParams.get('username');
        if (!username) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Username query parameter is required' }));
            return;
        }
        const exists = bloom.contains(username);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ exists }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
