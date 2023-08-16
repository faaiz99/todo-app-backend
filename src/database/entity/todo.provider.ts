/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Todo } from './todo.entity';

export const photoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: ['DATA_SOURCE'],
  },
];