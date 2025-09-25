import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
