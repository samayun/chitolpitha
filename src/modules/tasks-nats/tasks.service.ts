import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto) {
    return createTaskDto;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    id;
    return updateTaskDto;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
