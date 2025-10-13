// i just simply copied the dto from other module

import { IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[0-9])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  @MinLength(8)
  password: string;
}
