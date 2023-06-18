import {
  Ctx,
  Payload,
  ClientProxy,
  NatsContext,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { NATS_CLIENT } from '@nats/nats.module';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Controller, Get, Inject, Req } from '@nestjs/common';

@Controller('/tasks')
export class TasksController {
  constructor(
    @Inject(NATS_CLIENT) private client: ClientProxy,
    private tasksService: TasksService,
  ) {}

  @Get('/pubsub')
  async tests(@Req() req: Request) {
    console.log(this.client);
    const pattern = { topic: 'pubsub' };
    const data = { name: 'NATS', url: req.url };
    return this.client.send(pattern, data);
  }

  @EventPattern({ topic: 'pubsub' })
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    console.log({ tasks: data });
    return data;
  }

  @MessagePattern('createTask')
  create(@Payload() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/')
  async findAllTasks() {
    console.log(this.client);
    const pattern = { topic: 'findAllTasks' };
    const data = { page: 1, limit: 10 };
    return this.client.send(pattern, data);
  }

  @MessagePattern({ topic: 'findAllTasks' })
  findAll(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log({ data, context });
    return this.tasksService.findAll();
  }

  @MessagePattern('findOneTask')
  findOne(@Payload() id: number) {
    return this.tasksService.findOne(id);
  }

  @MessagePattern('updateTask')
  update(@Payload() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('removeTask')
  remove(@Payload() id: number) {
    return this.tasksService.remove(id);
  }
}
