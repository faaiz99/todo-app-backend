import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  findAll(): string {
    return 'todos';
  }
  findOne(): string {
    return 'single Todo';
  }
}
