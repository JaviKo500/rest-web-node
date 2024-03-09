import { Router } from 'express';
import { TodoController } from './todo.controller';
export class TodoRoutes {
   static get routes():Router {
      const router = Router();
      const todoController = new TodoController();
      router.get('/', todoController.getListTodo);
      
      return router;
   }
}