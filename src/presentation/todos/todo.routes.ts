import { Router } from 'express';
import { TodoController } from './todo.controller';
export class TodoRoutes {
   static get routes():Router {
      const router = Router();
      const todoController = new TodoController();
      router.get('/', todoController.getListTodo);
      router.get('/:id', todoController.getTodoById);
      router.put('/:id', todoController.updateTodo);
      router.post('/', todoController.createTodo);
      router.delete('/:id', todoController.getListTodo);
      
      return router;
   }
}