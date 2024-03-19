import { UpdateTodoDto } from './../../domain/dtos/todos/update-todo.dto';
import { CreateTodoDto } from './../../domain/dtos';
import { Request, Response} from 'express';
import { prisma } from '../../data/postgres-data';
import { TodoRepository } from '../../domain';

export class TodoController {
   // * dependencies injected
   constructor(
      private readonly todoRepository: TodoRepository
   ) {

   }

   public getListTodo = async (req: Request, res: Response) => {

      const listTodos = await this.todoRepository.getall();
      return res.status(200).json({
         data: listTodos,
      });
      
   }

   public getTodoById = async (req: Request, res: Response) => {
      const id = +req?.params?.id

      
      try {
         const selectedTodo = await this.todoRepository.findById( id );
         return res.status(200).json({
            data: selectedTodo,
         });
      } catch (error) {
         return res.status(404).json({
            msg: error,
         });
      }
   }

   createTodo = async ( req: Request, res: Response ) => {
      
      const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

      if ( error ) return res.status(400).json({
        msg: error
      });
      
      const todo = await this.todoRepository.create( createTodoDto! );

      res.status(200).json({
        msg: 'ok',
        data: todo,
      });
   }

   updateTodo = async ( req: Request, res: Response ) => {
      
      const id  = +req?.params?.id; 
      const [ error, updateTodoDto ] = UpdateTodoDto.update( {...req.body, id}  );

      if ( error ) {
         return res.status(400).json({
           msg: error
         });
      }
      try {
         const updatesTodo = await this.todoRepository.updateById( updateTodoDto! );
         return res.status(200).json({
            data: updatesTodo,
         });
      } catch (error) {
         return res.status(404).json({
            msg: error,
         });
      }
   }

   deleteTodo = async (req: Request, res: Response) => {
      const id  = +req?.params?.id; 

      try {
         const deletedTodo = await this.todoRepository.deleteById( id );
         return res.status(200).json({
            data: deletedTodo,
         });
      } catch (error) {
         return res.status(404).json({
            msg: error,
         });
      }
   }
}