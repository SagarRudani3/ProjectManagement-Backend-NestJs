import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: any) {
    return this.taskService.create(createTaskDto, user.email, user.isSuperUser);
  }

  @Get()
  findAll(@Query('projectId') projectId: string, @Query('columnId') columnId: string, @CurrentUser() user: any) {
    if (columnId) {
      return this.taskService.findByColumn(columnId, user.isSuperUser);
    }
    return this.taskService.findAll(projectId, user.isSuperUser);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.taskService.findOne(id, user.isSuperUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @CurrentUser() user: any) {
    return this.taskService.update(id, updateTaskDto, user.email, user.isSuperUser);
  }

  @Patch(':id/move')
  move(@Param('id') id: string, @Body() moveTaskDto: MoveTaskDto, @CurrentUser() user: any) {
    return this.taskService.move(id, moveTaskDto, user.email, user.isSuperUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
