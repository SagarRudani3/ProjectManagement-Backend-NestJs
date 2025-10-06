import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleSuperUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
