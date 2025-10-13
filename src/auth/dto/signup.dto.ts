// a signup dto that only minimum of 4 characters in username
// and password have different patterns for more security to prevent from hacking
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
