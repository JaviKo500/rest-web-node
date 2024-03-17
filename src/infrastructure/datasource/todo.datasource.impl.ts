import { prisma } from '../../data/postgres-data';
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from '../../domain';
export class TodoDatasourceImpl implements TodoDatasource {
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