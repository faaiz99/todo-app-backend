/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './entity/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect, jest } from '@jest/globals';

const TodoArray = [
  {
    description: 'abc',
    complete: false,
    completionDate: new Date(),
  },
  {
    description: 'efg',
    complete: false,
    completionDate: new Date(),
  },
];

const oneTodo = {
  description: 'abc',
  complete: false,
  completionDate: new Date(),
};

describe('TodosService', () => {
  let service: TodosService;
  let entity: typeof Todo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            findAll: jest.fn(() => TodoArray),
            findOne: jest.fn(),
            createOne: jest.fn(() => oneTodo),
            deleteOne: jest.fn(),
            destroy: jest.fn(() => oneTodo),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    entity = module.get<typeof Todo>(getRepositoryToken(Todo))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create()', () => {
    it('should successfully insert a user', () => {
      const oneUser = {
        firstName: 'firstName #1',
        lastName: 'lastName #1',
      };
      expect(
        service.createOne({
          description: 'abc',
          complete: false,
          completionDate: new Date(),
        }),
      ).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(TodoArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => { 
      /**
       * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33173
       */
    
      const findSpy = jest.spyOn(entity, 'findOne'  as never);
      expect(service.findOne(1));
      expect(findSpy).toBeCalledWith({ where: { id: 1 } });
    });
  });

  describe('deleteOne()', () => {
    it('should remove a user', async () => {
       /**
       * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33173
       */
      const findSpy = jest.spyOn(entity, 'findOne').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const retVal = await service.deleteOne(2);
      expect(findSpy).toBeCalledWith({ where: { id: 2 } });
      expect(retVal).toBeUndefined();
    });
  });
});
