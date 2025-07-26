const ConsistentHashing = require("../../consistent-hashing/consistent-hashing");
const { SHARDS } = require("./db/shard-config");
const { generateId } = require("./helper");

const hashRing = new ConsistentHashing(100);
SHARDS.forEach((s) => hashRing.addNode(s.id));

function getShardById(id) {
  const shardId = hashRing.getNode(id);
  return SHARDS.find((s) => s.id === shardId);
}

async function createNote(req, res, body) {
  const { title, content } = JSON.parse(body);
  const id = generateId();
  const shard = getShardById(id);

  await shard.client.query(
    "INSERT INTO notes (id, title, content) VALUES ($1, $2, $3)",
    [id, title, content]
  );

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ id }));
}

async function getNote(req, res, id) {
  const shard = getShardById(id);
  const result = await shard.client.query("SELECT * FROM notes WHERE id = $1", [
    id,
  ]);

  if (result.rows.length === 0) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(result.rows[0]));
}

async function removeNode(req, res, body) {
  const { nodeId } = JSON.parse(body);
  if (!nodeId) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: "nodeId is required" }));
    return;
  }

  const nodeIndex = SHARDS.findIndex((s) => s.id === nodeId);
  if (nodeIndex === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Node not found" }));
    return;
  }

  const removedShard = SHARDS[nodeIndex];

  hashRing.removeNode(nodeId);

  SHARDS.splice(nodeIndex, 1);

  const { rows } = await removedShard.client.query("SELECT * FROM notes");
  let moved = 0;
  for (const note of rows) {
    const correctShardId = hashRing.getNode(note.id);
    const targetShard = SHARDS.find((s) => s.id === correctShardId);
    await targetShard.client.query(
      "INSERT INTO notes (id, title, content, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
      [note.id, note.title, note.content, note.created_at]
    );
    moved++;
  }
  await removedShard.client.query("DELETE FROM notes");
  await removedShard.client.end();

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `Node ${nodeId} removed`, moved }));
}

module.exports = { createNote, getNote, removeNode };
