// i added a validation for login so this would prevent from data type errors
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
