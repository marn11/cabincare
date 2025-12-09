import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return result.rows;
  }

  async getCabinById(id: string) {
    const number = Number(id);
    if (isNaN(number)) throw new BadRequestException('Cabin id is invalid');
    const result = await this.pool.query(`SELECT * FROM cabins WHERE id = $1`, [
      number,
    ]);
    if (result.rows.length === 0)
      throw new NotFoundException('cabin not found');
    return result.rows[0];
  }
  //   async editCabin()
}
