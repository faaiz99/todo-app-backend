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
    todo.IDescription = createTodo.IDescription
    todo.ICompletionDate = createTodo.ICompletionDate
    todo.IComplete = createTodo.IComplete
    return this.todoRepository.save(todo)
  }

  completeOne(id:number, updateTodo:CreateTodo): Promise <UpdateResult>{
    console.log(updateTodo);
    let todo: Todo = new Todo();
    todo.IComplete = updateTodo.IComplete
    return this.todoRepository.update(id, todo)
  }
  updateOne(id: number, updateTodo: CreateTodo): Promise<UpdateResult> {
    let todo: Todo = new Todo();
    todo.IComplete = updateTodo.IComplete
    todo.ICompletionDate = updateTodo.ICompletionDate
    todo.IDescription = updateTodo.IDescription
    return this.todoRepository.update(id, todo)
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.todoRepository.delete(id)
  }

  findAll(): Promise<Todo[]> {
    return this.todoRepository.findBy({})
  }
  findOne(id: number): Promise<Todo | null> {
    return this.todoRepository.findOneBy({ ITodoID: id })
  }
}
