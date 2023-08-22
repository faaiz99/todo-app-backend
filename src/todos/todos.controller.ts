/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodo } from './dto/create-todo-dto';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createTodo: CreateTodo) {
    return this.todosService.createOne(createTodo);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  completeOne(@Param('id')id:number, @Body() updateTodo: CreateTodo){
    return this.todosService.completeOne(id, updateTodo)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodo: CreateTodo) {
    return this.todosService.updateOne(id, updateTodo)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.todosService.deleteOne(id)
  }
}
