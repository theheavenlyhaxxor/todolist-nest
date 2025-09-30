import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
