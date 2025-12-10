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
  async newCabin(name: string, location: string, image: string | null) {
    try {
      const result = await this.pool.query(
        `INSERT INTO cabins (cabin_name, 
        location, image) VALUES ($1, $2, $3) RETURNING *`,
        [name, location, image ?? null],
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
  async editCabin(
    id: string,
    data: { name?: string; location?: string; image?: string | null },
  ) {
    const number = Number(id);
    if (isNaN(number)) throw new BadRequestException('invalid cabin id');
    const doesExist = await this.getCabinById(id);
    const fields = [];
    const values = [];
    let index = 1;
    if (data.name) {
      fields.push(`cabin_name = $${index++}`);
      values.push(data.name);
    }
    if (data.location) {
      fields.push(`location = $${index++}`);
      values.push(data.location);
    }
    if (data.image) {
      fields.push(`image = $${index++}`);
      values.push(data.image);
    }
    if (fields.length === 0) {
      throw new BadRequestException('no fields to update');
    }
    const query = `UPDATE cabins
    SET ${fields.join(', ')}
    WHERE id = $${index}
    RETURNING *`;

    values.push(number);

    const result = await this.pool.query(query, values);

    return result.rows[0];
  }
}
