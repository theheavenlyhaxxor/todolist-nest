import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TaskService {
  constructor(private db: DatabaseService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const { title, description } = createTaskDto;

    await this.db
      .getPool()
      .execute(
        'INSERT INTO todos (title, description, userId) VALUES (?, ?, ?)',
        [title, description, userId],
      );

    return { messsage: 'task created' };
  }

  async findAll(userId: number) {
    const [rows] = await this.db
      .getPool()
      .execute('SELECT * FROM todos WHERE userId = ?', [userId]);

    const data = rows as any[];

    return data;
  }

  async findOne(id: number, userId: number) {
    const [row] = await this.db
      .getPool()
      .execute('SELECT * FROM todos WHERE id = ? AND userId = ?', [id, userId]);

    const task = (row as any[])[0];

    if (!task) {
      throw new BadRequestException('task not found');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const { title, description } = updateTaskDto;

    const [result] = await this.db
      .getPool()
      .execute(
        'UPDATE todos SET title = ?, description = ? WHERE id = ? AND userId = ?',
        [title, description, id, userId],
      );

    const affectedRows = (result as any).affectedRows;
    if (affectedRows === 0) {
      throw new BadRequestException('Task not found or not authorized');
    }

    return { message: 'Task updated successfully' };
  }

  async updateStatus(id: number) {
    const task = await this.db
      .getPool()
      .execute('UPDATE todos SET isCompleted = ? WHERE id = ?', [true, id]);

    return { message: 'status updated', task };
  }

  async remove(id: number, userId: number) {
    const query = await this.db
      .getPool()
      .execute('DELETE FROM todos WHERE id = ? AND userId = ?', [id, userId]);

    const { affectedRows } = query as any;

    if (affectedRows === 0) {
      throw new BadRequestException('No task found');
    }

    return { message: 'Task Deleted' };
  }
}
