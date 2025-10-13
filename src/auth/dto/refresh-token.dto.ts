// a refres token dto so that it would return a message saying that some fields are required
// and strictly data types like string and int
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
