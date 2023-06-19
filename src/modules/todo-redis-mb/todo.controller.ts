import {
  Payload,
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { REDIS_MESSAGE_BROKER } from '@common/constants';
import { Controller, Get, Inject, Req } from '@nestjs/common';

@Controller('/todos')
export class TodoController {
  // client: ClientProxy;

  // constructor(private readonly appService: AppService) {
  //   this.client = ClientProxyFactory.create(getRedisOptions);
  // }

  constructor(
    private readonly todoService: TodoService,
    @Inject(REDIS_MESSAGE_BROKER) private client: ClientProxy,
  ) {}

  @Get('/pubsub')
  async tests(@Req() req: Request) {
    const pattern = { topic: 'pubsub' };
    const data = { name: 'REDIS', url: req.url };
    console.log({ TodoController: data });
    return this.client.send(pattern, data);
  }

  @EventPattern({ topic: 'pubsub' })
  async handleBookCreatedEvent(data: Record<string, unknown>) {
    return data;
  }

  @MessagePattern('createTodo')
  create(@Payload() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @MessagePattern('findAllTodo')
  findAll() {
    return this.todoService.findAll();
  }

  @MessagePattern('findOneTodo')
  findOne(@Payload() id: number) {
    return this.todoService.findOne(id);
  }

  @MessagePattern('updateTodo')
  update(@Payload() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(updateTodoDto.id, updateTodoDto);
  }

  @MessagePattern('removeTodo')
  remove(@Payload() id: number) {
    return this.todoService.remove(id);
  }
}
