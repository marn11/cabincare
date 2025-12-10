// backend/src/db/seed.ts
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { getConnectionString } from './connection';

dotenv.config();

const pool = new Pool({
  connectionString: getConnectionString(),
});

async function seed() {
  try {
    console.log('Seeding database...');
    await pool.query(`CREATE TABLE IF NOT EXISTS cabins (
            id SERIAL PRIMARY KEY,
            cabin_name VARCHAR(255) NOT NULL UNIQUE,
            location TEXT NOT NULL,
            image TEXT NOT NULL);
            `);
    await pool.query(`CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            cabin_id INT NOT NULL REFERENCES cabins(id) ON DELETE CASCADE,
            description TEXT NOT NULL,
            priority TEXT CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
            status TEXT CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETE'))
            );
            `);
    // Clear existing data
    await pool.query('DELETE FROM tasks;');
    await pool.query('DELETE FROM cabins;');

    // Insert cabins
    const cabins = [
      { name: 'Alpine Cabin', location: 'Rabat' },
      { name: 'Lake View Cabin', location: 'Casablanca' },
      { name: 'Pine Retreat', location: 'Tétouan' },
    ];

    const cabinIds: number[] = [];

    for (const cabin of cabins) {
      const res = await pool.query(
        'INSERT INTO cabins (cabin_name, location, image) VALUES ($1, $2, $3) RETURNING id',
        [cabin.name, cabin.location, 'leaky.jpg'],
      );
      cabinIds.push(res.rows[0].id);
    }

    // Insert tasks
    const tasks = [
      {
        cabinIndex: 0,
        description: 'Leaky faucet in main bath',
        priority: 'HIGH',
        status: 'PENDING',
      },
      {
        cabinIndex: 0,
        description: 'Broken window',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
      },
      {
        cabinIndex: 1,
        description: 'Roof inspection',
        priority: 'LOW',
        status: 'PENDING',
      },
      {
        cabinIndex: 1,
        description: 'Heater repair',
        priority: 'HIGH',
        status: 'PENDING',
      },
      {
        cabinIndex: 2,
        description: 'Replace door lock',
        priority: 'MEDIUM',
        status: 'PENDING',
      },
    ];

    for (const task of tasks) {
      await pool.query(
        'INSERT INTO tasks (cabin_id, description, priority, status) VALUES ($1, $2, $3, $4)',
        [
          cabinIds[task.cabinIndex],
          task.description,
          task.priority,
          task.status,
        ],
      );
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seed();
