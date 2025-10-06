import { IsString, IsOptional, IsMongoId, IsNumber } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsOptional()
  columnId?: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
