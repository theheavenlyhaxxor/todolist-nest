import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePositionDto {
  @IsNotEmpty()
  @IsString()
  position_code: string;

  @IsNotEmpty()
  @IsString()
  position_name: string;
}
