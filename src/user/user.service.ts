// keeping the code short and readable, also impmplemented some hashing when updating the user
import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserUpdateDto } from './dto/user.update.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async getUser(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute('SELECT * FROM users WHERE id = ?', [id]);

    const user = (rows as any[])[0];

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }

  async deleteUser(id: number) {
    const [rows] = await this.db
      .getPool()
      .execute('DELETE FROM users WHERE id = ?', [id]);

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return { message: 'succesfully deleted user' };
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto) {
    const { username, password } = userUpdateDto;

    const hash = await bcrypt.hash(password, 10);

    const [rows] = await this.db
      .getPool()
      .execute('UPDATE users SET username = ?, password = ? WHERE id = ? ', [
        username,
        hash,
        id,
      ]);

    const { affectedRows } = rows as any;

    if (affectedRows === 0) {
      throw new BadRequestException('User not found');
    }

    return { message: 'User Updated succesfully' };
  }

  async getAllUsers() {
    const [rows] = await this.db.getPool().execute('SELECT * FROM users');
    const data = rows as any[];
    if (data.length === 0) {
      throw new BadRequestException('No Data found');
    }

    return data;
  }

  async getUserByUsername(username: string) {
    const [rows] = await this.db
      .getPool()
      .execute('SELECT * FROM users WHERE username = ?', [username]);

    const affectedRows = (rows as any[])[0];

    if (!affectedRows) {
      throw new BadRequestException('User not found');
    }

    return affectedRows;
  }
}
