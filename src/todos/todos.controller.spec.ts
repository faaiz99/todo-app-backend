import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodo } from './dto/create-todo-dto';

const createTodo: CreateTodo = {
  description: 'abc',
  complete: false,
  completionDate: new Date(),
};

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            createOne: jest
              .fn()
              .mockImplementation((todo: CreateTodo) =>
                Promise.resolve({ id: 1, ...todo }),
              ),
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                description: 'efg',
                complete: false,
                completionDate: new Date(),
                id,
              }),
            ),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOne()', () => {
    it('should create a user', () => {
      expect(controller.create(createTodo)).resolves.toEqual({
        id: 1,
        ...createTodo,
      });
      expect(service.createOne).toHaveBeenCalled();
      expect(service.createOne).toHaveBeenCalledWith(createTodo);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      controller.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
      expect(controller.findOne(1)).resolves.toEqual({
        description: 'efg',
        complete: false,
        completionDate: new Date(),
        id: 1,
      });
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      controller.deleteOne(2);
      expect(service.deleteOne).toHaveBeenCalled();
    });
  });
});
