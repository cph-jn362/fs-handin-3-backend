import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(TodoEntity)
        private todoRepositoy: Repository<TodoEntity>
    ){}

    create(todo: TodoEntity){
        return this.todoRepositoy.save(todo);
    }

    findAll(){
        return this.todoRepositoy.find();
    }

    findOne(id: number){
        return this.todoRepositoy.findOneBy({id: id});
    }

    remove(id: number){
        return this.todoRepositoy.delete(id);
    }
}
