import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnalyticsService {
  constructor(private db: DatabaseService) {}

  async getData() {
    const pool = this.db.getPool();

    const sql = `
            SELECT
                (SELECT COUNT(*) FROM todos) AS todos,
                (SELECT COUNT(*) FROM users) AS users,
                (SELECT COUNT(*) FROM positions) AS positions,
                (
                  (SELECT COUNT(*) FROM todos) +
                  (SELECT COUNT(*) FROM users) +
                  (SELECT COUNT(*) FROM positions)
                ) AS total
        `;

    const [rows] = await pool.query(sql);
    const row: any = Array.isArray(rows) ? rows[0] : rows;

    return {
      todos: Number(row.todos) || 0,
      users: Number(row.users) || 0,
      positions: Number(row.positions) || 0,
      total: Number(row.total) || 0,
    };
  }
}
