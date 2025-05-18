const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 20000
});

async function createPartitionedTable() {
  await client.query(`
    CREATE SEQUENCE IF NOT EXISTS students_parts_id_seq;

    CREATE TABLE IF NOT EXISTS students_parts (
      id INT NOT NULL DEFAULT nextval('students_parts_id_seq'),
      name TEXT NOT NULL,
      grade INT NOT NULL,
      PRIMARY KEY (id, grade)
    ) PARTITION BY RANGE (grade);
  `);
}

async function createPartitions() {
  const ranges = [
    [0, 40],
    [40, 70],
    [70, 80],
    [80, 100],
  ];

  for (const [from, to] of ranges) {
    const partitionName = `students_part_${from}_${to}`;

    const partitionSQL = `
      CREATE TABLE IF NOT EXISTS ${partitionName} PARTITION OF students_parts
      FOR VALUES FROM (${from}) TO (${to});
    `;

    await client.query(partitionSQL);

    console.log(`✅ Created partition: ${partitionName} with index on grade`);
  }

  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_students_parts_grade ON students_parts (grade);
  `);
  console.log('✅ Created index on students_parts grade');
}

async function main() {
  try {
    await client.connect();
    await createPartitionedTable();
    await createPartitions();
    console.log('🎉 All partitions created successfully.');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await client.end();
  }
}

main();
