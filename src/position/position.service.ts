// added all the crud including the put method
// also added a more secure authentication that only the
// logged in person can also access the data

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PositionService {
  constructor(private db: DatabaseService) {}

  async create(createPositionDto: CreatePositionDto, userId: number) {
    const { position_code, position_name } = createPositionDto;
    console.log(userId, position_code, position_name);
    await this.db
      .getPool()
      .execute(
        'INSERT INTO positions (position_code, position_name, userId) VALUES (?, ?, ?)',
        [position_code, position_name, userId],
      );

    return { messsage: 'position created' };
  }

  async findAll(userId: number) {
    console.log(userId);
    const [rows] = await this.db
      .getPool()
      .execute('SELECT * FROM positions WHERE userId = ?', [userId]);

    const data = rows as any[];

    return data;
  }

  async findOne(id: number, userId: number) {
    const [row] = await this.db
      .getPool()
      .execute('SELECT * FROM positions WHERE id = ? AND userId = ?', [
        id,
        userId,
      ]);

    const task = (row as any[])[0];

    if (!task) {
      throw new BadRequestException('task not found');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdatePositionDto, userId: number) {
    const { position_code, position_name } = updateTaskDto;

    const [result] = await this.db
      .getPool()
      .execute(
        'UPDATE positions SET position_code = ?, position_name = ? WHERE id = ? AND userId = ?',
        [position_code, position_name, id, userId],
      );

    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) {
      throw new BadRequestException('Position not found or not authorized');
    }

    return { message: 'Position updated successfully' };
  }

  async patch(id: number, updateTaskDto: UpdatePositionDto, userId: number) {
    const { position_code, position_name } = updateTaskDto;

    const [result] = await this.db
      .getPool()
      .execute(
        'UPDATE positions SET position_code = ?, position_name = ? WHERE id = ? AND userId = ?',
        [position_code, position_name, id, userId],
      );

    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) {
      throw new BadRequestException('Position not found or not authorized');
    }

    return { message: 'Position updated successfully' };
  }

  async remove(id: number, userId: number) {
    const query = await this.db
      .getPool()
      .execute('DELETE FROM positions WHERE id = ? AND userId = ?', [
        id,
        userId,
      ]);

    const { affectedRows } = query as any;

    if (affectedRows === 0) {
      throw new BadRequestException('No Position found');
    }

    return { message: 'Position Deleted' };
  }
}
