import { Injectable, BadRequestException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, password } = signupDto;

    const [rows] = (await this.db
      .getPool()
      .execute('SELECT * FROM users WHERE username = ?', [username])) as any[];

    if (rows.length > 0) {
      throw new BadRequestException('Username Already Taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.db
      .getPool()
      .execute('INSERT INTO users (username, password) VALUES(?, ?)', [
        username,
        hashedPassword,
      ]);

    return { message: 'Succesfuly created' };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const [rows] = (await this.db
      .getPool()
      .execute('SELECT * FROM users WHERE username = ?', [username])) as any[];

    if (rows.length === 0) {
      throw new BadRequestException('Invalid Credentials');
    }

    const user = rows[0];
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = { userId: user.id, username: user.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.secret'),
      expiresIn: this.config.get<string>('jwt.expiresIn'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('jwt.refreshSecret'),
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });

    const hashedRT = await bcrypt.hash(refreshToken, 10);
    await this.db
      .getPool()
      .execute('UPDATE users SET refreshToken = ? WHERE id = ?', [
        hashedRT,
        user.id,
      ]);
    return { accessToken, refreshToken };
  }

  async logout(userId: number) {
    await this.db
      .getPool()
      .execute('UPDATE users SET refreshToken = NULL WHERE id = ?', [userId]);
    return { message: 'Successfully logged out' };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { userId, refreshToken } = refreshTokenDto;
    const [rows] = (await this.db
      .getPool()
      .execute('SELECT * FROM users WHERE id = ? ', [userId])) as any[];

    if (rows.length === 0) {
      throw new BadRequestException('Invalid User');
    }

    const user = rows[0];

    if (!user.refreshToken) {
      throw new BadRequestException('Invalid Request');
    }

    const isRtMatched = await bcrypt.compare(refreshToken, user.refreshToken);
    console.log(refreshToken);
    console.log(user.refreshToken);
    if (!isRtMatched) {
      throw new BadRequestException('Invalid Refresh Token');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('jwt.secret'),
      expiresIn: this.config.get<string>('jwt.expiresIn'),
    });

    const newRefreshToken = this.jwtService.sign(payload, {
      secret: this.config.get('jwt.refreshSecret'),
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });

    const hashedRT = await bcrypt.hash(refreshToken, 10);
    await this.db
      .getPool()
      .execute('UPDATE users SET refreshToken = ? WHERE id = ?', [
        hashedRT,
        user.id,
      ]);
    return { accessToken, newRefreshToken };
  }
}
