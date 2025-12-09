import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: async () => {
        const pool = new Pool({
          connectionString: process.env.DB_URL,
        });
        await pool.query(`CREATE TABLE IF NOT EXISTS cabins (
            id SERIAL PRIMARY KEY,
            cabin_name VARCHAR(255) NOT NULL,
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
        return pool;
      },
    },
  ],
  exports: ['PG_POOL'],
})
export class DbModule {}
