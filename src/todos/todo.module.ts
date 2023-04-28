import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { TodoController } from './todo.controller';


@Module({
    imports: [TypeOrmModule.forFeature([TodoEntity])],
    providers: [TodoService],
    controllers: [TodoController],
})
export class TodoModule {}
