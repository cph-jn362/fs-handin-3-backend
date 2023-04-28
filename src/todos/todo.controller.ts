import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Get()
  async getAll(): Promise<TodoEntity[]> {
    return await this.todoService.findAll();
  }

  @Post()
  create(@Body() todo: TodoEntity): Promise<TodoEntity> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
