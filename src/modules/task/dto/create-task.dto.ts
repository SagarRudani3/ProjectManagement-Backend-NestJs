import { IsNotEmpty, IsString, IsOptional, IsMongoId, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  columnId: string;

  @IsMongoId()
  @IsNotEmpty()
  projectId: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
