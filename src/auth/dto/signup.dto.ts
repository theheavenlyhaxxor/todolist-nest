import { IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[0-9])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
