import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CabinDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
