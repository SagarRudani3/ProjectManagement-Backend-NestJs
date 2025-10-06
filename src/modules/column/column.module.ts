import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import { Column, ColumnSchema } from '../../database/schemas/column.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Column.name, schema: ColumnSchema }])],
  controllers: [ColumnController],
  providers: [ColumnService],
})
export class ColumnModule {}
