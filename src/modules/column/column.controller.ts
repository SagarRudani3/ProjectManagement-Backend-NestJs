import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto, @CurrentUser() user: any) {
    return this.columnService.create(createColumnDto, user.email, user.isSuperUser);
  }

  @Get()
  findByProject(@Query('projectId') projectId: string, @CurrentUser() user: any) {
    return this.columnService.findByProject(projectId, user.isSuperUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto, @CurrentUser() user: any) {
    return this.columnService.update(id, updateColumnDto, user.email, user.isSuperUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnService.remove(id);
  }
}
