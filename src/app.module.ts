// added here the config file that has all of the .env keys
// i made it availble glbally for all of the files that need the key so
//  they can be easily accessed,

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import config from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { PositionModule } from './position/position.module';
import { LogModule } from './log/log.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
        expireIn: config.get('jwt.expiresIn'),
        refreshSecret: config.get('jwt.refresh'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    TaskModule,
    UserModule,
    PositionModule,
    LogModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
