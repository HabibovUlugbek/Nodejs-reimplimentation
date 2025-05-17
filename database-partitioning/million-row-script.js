//npm install pg @faker-js/faker for packages

const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

const client = new Client({
 user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 20000,
});

async function seed() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        grade INT NOT NULL
      );
    `);

    console.log('Table is ready.');

    const BATCH_SIZE = 1000;
    const TOTAL = 10_000_000;

    for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
      const values = [];

      for (let j = 0; j < BATCH_SIZE && i + j < TOTAL; j++) {
        const firstName = faker.person.firstName(); 
        const grade = Math.floor(Math.random() * 100);
        values.push(`('${firstName.replace(/'/g, "''")}', ${grade})`);
      }

      const query = `
        INSERT INTO students (name, grade)
        VALUES ${values.join(',')};
      `;

      await client.query(query);
      console.log(`Inserted ${i + values.length} / ${TOTAL}`);
    }

    console.log('Done seeding 10 million rows!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

seed();