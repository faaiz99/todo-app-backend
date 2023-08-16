import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoModule } from './todo/todo.module';

@Module({
  providers: [TodoService],
  imports: [TodoModule],
})
export class TodoModule {}
