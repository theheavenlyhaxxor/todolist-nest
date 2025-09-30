import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../guards/guards';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(createTaskDto, req.userId);
  }

  @Patch(':id/done')
  updateStatus(@Param('id') id: number) {
    return this.taskService.updateStatus(id);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taskService.findAll(req.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.taskService.findOne(+id, req.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.update(+id, updateTaskDto, req.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.taskService.remove(+id, req.userId);
  }
}
