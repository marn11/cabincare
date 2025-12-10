import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsNumber()
  cabin_id: number;
}
