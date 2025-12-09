import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CabinsService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}
  async newCabin(name: string, location: string, image: string) {
    try {
      const result = await this.pool.query(
        `INSERT INTO cabins (cabin_name, 
        location, image) VALUES ($1, $2, $3) RETURNING *`,
        [name, location, image],
      );
      return result.rows[0];
    } catch (e: any) {
      if (e?.code === '23505') {
        throw new ConflictException('Cabin name already exists');
      }
      throw e;
    }
  }
  async getAllCabins() {
    const result = await this.pool.query(`SELECT * FROM cabins`);
    console.log(result.rows)
    return result.rows;
  }
  //   async editCabin()
}
