import { Router } from 'express';
import { TodoController } from './todo.controller';
import { TodoDatasource } from '../../domain';
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';
export class TodoRoutes {
   static get routes():Router {
      const router = Router();
      
      const dataSource = new TodoDatasourceImpl();
      const todoRepository = new TodoRepositoryImpl( dataSource );
      const todoController = new TodoController( todoRepository );

      router.get('/', todoController.getListTodo);
      router.get('/:id', todoController.getTodoById);
      router.put('/:id', todoController.updateTodo);
      router.post('/', todoController.createTodo);
      router.delete('/:id', todoController.deleteTodo);
      
      return router;
   }
}