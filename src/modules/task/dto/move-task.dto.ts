import { IsNotEmpty, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class MoveTaskDto {
  @IsMongoId()
  @IsNotEmpty()
  columnId: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
