const { Client } = require("pg");

const SHARDS = [
  {
    id: "shard-1",
    client: new Client({
      connectionString: "postgres://user:pass@localhost:5433/shard1",
    }),
  },
  {
    id: "shard-2",
    client: new Client({
      connectionString: "postgres://user:pass@localhost:5434/shard2",
    }),
  },
  {
    id: "shard-3",
    client: new Client({
      connectionString: "postgres://user:pass@localhost:5435/shard3",
    }),
  },
];

async function initShards() {
  for (const shard of SHARDS) {
    await shard.client.connect();
    await shard.client.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id VARCHAR PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log(`Initialized for ${shard.id}`);
  }
}

module.exports = { SHARDS, initShards };
