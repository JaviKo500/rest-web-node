import { TodoEntity,  CreateTodoDto, TodoDatasource, UpdateTodoDto} from '../';
import { prisma } from '../../data/postgres-data';

export class TodoRepository implements TodoDatasource{
   async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
   }
   async getall(): Promise<TodoEntity[]> {
      const listTodos = await prisma.todo.findMany();
      return listTodos.map( todo => TodoEntity.fromObject( todo ) );
   }
   async findById(id: number): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
   }
   async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
   }
   async deleteById(id: number): Promise<TodoEntity> {
      throw new Error("Method not implemented.");
   }
   
}