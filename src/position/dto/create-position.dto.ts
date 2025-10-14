import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  position_code: string;

  @IsNotEmpty()
  @IsString()
  position_name: string;
}
