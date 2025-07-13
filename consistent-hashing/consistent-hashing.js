const crypto = require("crypto");

class ConsistentHashing {
  constructor(replicas = 100) {
    this.replicas = replicas;
    this.ring = new Map();
    this.sortedNodeHashes = [];
    this.nodes = new Set();
  }

  _hash(value) {
    const hex = crypto.createHash("sha256").update(value).digest("hex");
    return parseInt(hex.substring(0, 8), 16);
  }

  addNode(node) {
    if (this.nodes.has(node)) return;
    this.nodes.add(node);

    for (let i = 0; i < this.replicas; i++) {
      const vnodeId = `${node}#${i}`;
      const vnodeHash = this._hash(vnodeId);

      if (!this.ring.has(vnodeHash)) {
        this.ring.set(vnodeHash, node);
        this.sortedNodeHashes.push(vnodeHash);
      }
    }

    this.sortedNodeHashes.sort((a, b) => a - b);
  }

  removeNode(node) {
    if (!this.nodes.has(node)) return;
    this.nodes.delete(node);

    for (let i = 0; i < this.replicas; i++) {
      const vnodeId = `${node}#${i}`;
      const vnodeHash = this._hash(vnodeId);

      this.ring.delete(vnodeHash);

      const index = this.sortedNodeHashes.indexOf(vnodeHash);
      if (index !== -1) {
        this.sortedNodeHashes.splice(index, 1);
      }
    }
  }

  getNode(key) {
    if (this.sortedNodeHashes.length === 0) return null;

    const keyHash = this._hash(key);

    for (let i = 0; i < this.sortedNodeHashes.length; i++) {
      if (keyHash <= this.sortedNodeHashes[i]) {
        return this.ring.get(this.sortedNodeHashes[i]);
      }
    }

    return this.ring.get(this.sortedNodeHashes[0]);
  }
}

module.exports = ConsistentHashing;
