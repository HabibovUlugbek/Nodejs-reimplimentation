const ConsistentHashing = require("./consistent-hashing");

const NUM_NODES = 100;
const NUM_KEYS = 1_000_000;

const ring = new ConsistentHashing();

for (let i = 0; i < NUM_NODES; i++) {
  ring.addNode(`Node${i}`);
}

const keyToNodeBefore = {};
const distributionBefore = {};

for (let i = 0; i < NUM_KEYS; i++) {
  const key = `user${i}`;
  const node = ring.getNode(key);
  keyToNodeBefore[key] = node;
  distributionBefore[node] = (distributionBefore[node] || 0) + 1;
}

const randomIndex = Math.floor(Math.random() * NUM_NODES);
console.log(`Removing Node: Node${randomIndex}`);
const removedNode = `Node${randomIndex}`;
ring.removeNode(removedNode);

const distributionAfter = {};
let reassigned = 0;

for (let i = 0; i < NUM_KEYS; i++) {
  const key = `user${i}`;
  const newNode = ring.getNode(key);
  const oldNode = keyToNodeBefore[key];

  if (oldNode === removedNode) {
    reassigned++;
  }

  distributionAfter[newNode] = (distributionAfter[newNode] || 0) + 1;
}

function analyzeDistribution(distribution, expectedNodeCount) {
  const counts = Object.values(distribution);
  const total = counts.reduce((a, b) => a + b, 0);
  const average = total / expectedNodeCount;
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const stdDev = Math.sqrt(
    counts.reduce((sum, c) => sum + (c - average) ** 2, 0) / expectedNodeCount
  );

  return { total, average, max, min, stdDev };
}
console.log("Virtual node count in ring:", ring.sortedNodeHashes.length);

const statsBefore = analyzeDistribution(distributionBefore, NUM_NODES);
const statsAfter = analyzeDistribution(distributionAfter, NUM_NODES - 1);

console.log("\n------ BEFORE Removal ------");
console.log(`- Total keys:      ${statsBefore.total}`);
console.log(`- Avg per node:    ${statsBefore.average.toFixed(2)}`);
console.log(`- Max per node:    ${statsBefore.max}`);
console.log(`- Min per node:    ${statsBefore.min}`);
console.log(`- Std deviation:   ${statsBefore.stdDev.toFixed(2)}`);

console.log(`\n Removed Node: ${removedNode}`);
console.log(` Keys Reassigned: ${reassigned} / ${NUM_KEYS}`);
console.log(` Reassigned:     ${((reassigned / NUM_KEYS) * 100).toFixed(2)}%`);

console.log("\n------ AFTER Removal ------");
console.log(`- Total keys:      ${statsAfter.total}`);
console.log(`- Avg per node:    ${statsAfter.average.toFixed(2)}`);
console.log(`- Max per node:    ${statsAfter.max}`);
console.log(`- Min per node:    ${statsAfter.min}`);
console.log(`- Std deviation:   ${statsAfter.stdDev.toFixed(2)}`);
