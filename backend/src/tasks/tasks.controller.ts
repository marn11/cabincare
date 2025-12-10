import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/newtask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post()
  create(@Body() TaskDto: TaskDto) {
    return this.tasksService.newTask(
      TaskDto.description,
      TaskDto.priority,
      TaskDto.status,
      TaskDto.cabin_id,
    );
  }

  @Get(':id')
  findCabinTasks(@Param('id') id: string) {
    return this.tasksService.getAllTasks(id);
  }
  @Put(':id')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.tasksService.updateTaskStatus(id, body.status);
  }
}
