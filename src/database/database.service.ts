// you will notice in here that i did not paste my database keys, i take advantage of the 
// config file and used it here for more secure of my .env keys
// i also added here my sql SCHEMA so no need to use the workbench when running this from start
// it automatically create database tables instead of using mysql workbench
// and also added a try catch when connecting to database to prevent the server from crashing
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
    await this.createTables();
  }

  private async createTables() {
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        refreshToken VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createTodoTable = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        isCompleted BOOLEAN DEFAULT FALSE NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    try {
      const connection = await this.pool.getConnection();
      await connection.query(createUserTable);
      await connection.query(createTodoTable);
      connection.release();
      console.log('✅ Tables ensured');
    } catch (error: any) {
      console.error('❌ Failed to create tables:', error);
      throw new Error(`message: ${error.message}`);
    }
  }

  private async testConnection() {
    try {
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('✅ Database Successfully Connected');
    } catch (error: any) {
      console.error('❌ Database connection failed:', error);
      throw new Error(`message: ${error.message}`);
    }
  }

  getPool() {
    return this.pool;
  }
}
