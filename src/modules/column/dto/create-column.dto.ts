import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  order: number;

  @IsMongoId()
  @IsNotEmpty()
  projectId: string;
}
