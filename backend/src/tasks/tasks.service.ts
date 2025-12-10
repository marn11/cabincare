import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class TasksService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}
  async newTask(
    description: string,
    priority: string,
    status: string,
    cabin_id: number,
  ) {
    try {
      const result = await this.pool.query(
        `INSERT INTO tasks (description, 
        priority, status, cabin_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [description, priority, status, cabin_id],
      );
      return result.rows[0];
    } catch (e: any) {
      if (e?.code === '23514') {
        throw new ConflictException('wrong argument provided');
      }
      throw e;
    }
  }

  async getAllTasks(id: string) {
    const number = Number(id);
    if (isNaN(number)) throw new BadRequestException('Cabin id is invalid');
    const result = await this.pool.query(
      `SELECT * FROM tasks WHERE cabin_id = $1`,
      [number],
    );
    if (result.rows.length === 0) throw new NotFoundException('no tasks');
    return result.rows;
  }
  async updateTaskStatus(id: string, status: string) {
    const taskId = Number(id);
    if (isNaN(taskId)) {
      throw new BadRequestException('invalid task id');
    }
    const result = await this.pool.query(
      `UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *`,
      [status, taskId],
    );
    if (result.rowCount === 0) {
      throw new NotFoundException('task not found');
    }

    return result.rows[0];
  }
}
