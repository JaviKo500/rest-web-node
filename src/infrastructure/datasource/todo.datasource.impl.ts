import { prisma } from '../../data/postgres-data';
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto,  } from '../../domain';
export class TodoDatasourceImpl implements TodoDatasource {
   async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
      const todo = await prisma.todo.create( { 
         data: createTodoDto! 
      });
      return TodoEntity.fromObject( todo );
   }
   async getall(): Promise<TodoEntity[]> {
      const listTodos = await prisma.todo.findMany();
      return listTodos.map( todo => TodoEntity.fromObject( todo ) );
   }
   async findById(id: number): Promise<TodoEntity> {
      const selectedTodo = await prisma.todo.findFirst({
         where: {
            id: id
         }
      });
      if ( !selectedTodo ) throw new CustomError(`Todo with ${id} not found `, 404);
      return TodoEntity.fromObject( selectedTodo ) ;
   }
   async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
      await this.findById( updateTodoDto.id! );
      const updatedTodo = await prisma.todo.update({
         data: updateTodoDto!,
         where: { id: updateTodoDto.id }
      });
      return TodoEntity.fromObject( updatedTodo );
   }
   async deleteById(id: number): Promise<TodoEntity> {
      const todo = await this.findById( id );
      await prisma.todo.delete( { where: { id } } );
      return todo;
   }
   
}