import { Router } from 'express';
import { TodoController } from './todo.controller';
export class TodoRoutes {
   static get routes():Router {
      const router = Router();
      const todoController = new TodoController();
      router.get('/', todoController.getListTodo);
      router.get('/:id', todoController.getTodoById);
      router.get('/create', todoController.getListTodo);
      router.get('/update', todoController.getListTodo);
      router.get('/delete', todoController.getListTodo);
      
      return router;
   }
}