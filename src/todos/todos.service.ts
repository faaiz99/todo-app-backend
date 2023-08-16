/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, UpdateResult, Repository } from 'typeorm'
import { CreateTodo } from './dto/create-todo-dto';
import { Todo } from './entity/todo.entity';


@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) { }

  createOne(createTodo: CreateTodo): Promise<Todo | null> {
    let todo: Todo = new Todo();
    todo.description = createTodo.description
    todo.completetionDate = createTodo.completionDate
    todo.complete = todo.complete
    return this.todoRepository.save(todo)
  }

  updateOne(id: number, updateTodo: CreateTodo): Promise<UpdateResult> {
    let todo: Todo = new Todo();
    todo.complete = updateTodo.complete
    todo.completetionDate = updateTodo.completionDate
    todo.description = updateTodo.description
    return this.todoRepository.update(id, todo)
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id)
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.findBy({})
  }
  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ id: id })
  }
}
