/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
@Injectable()
export class TodoService {
	constructor(
		@Inject('TODO_REPOSITORY')
		private todoRepository: Repository<Todo>,
	  ) {}
	
	  async findAll(): Promise<Todo[]> {
		return this.todoRepository.find();
	  }
}
