/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Request } from 'express';
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Req() request: Request): string {
    // console.log(request);
    return this.todosService.findAll();
  }
}
