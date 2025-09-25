import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: mysql.Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = mysql.createPool({
      host: this.configService.get<string>('database.databaseHost'),
      user: this.configService.get<string>('database.databaseUser'),
      password: this.configService.get<string>('database.databasePassword'),
      database: this.configService.get<string>('database.databaseName'),
      port: this.configService.get<number>('database.databasePort'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async onModuleInit() {
    await this.testConnection();
  }

  private async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      console.log('Database Successfully Connected');
    } catch (error) {
      throw new Error(`message: ${error.message}`);
    }
  }
}
