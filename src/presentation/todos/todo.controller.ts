import { UpdateTodoDto } from './../../domain/dtos/todos/update-todo.dto';
import { CreateTodoDto } from './../../domain/dtos';
import { Request, Response} from 'express';
import { prisma } from '../../data/postgres-data';

export class TodoController {
   // * dependencies injected
   constructor() {

   }

   public getListTodo = async (req: Request, res: Response) => {

      const listTodos = await prisma.todo.findMany();
      return res.status(200).json({
         data: listTodos,
      });
   }

   public getTodoById = async (req: Request, res: Response) => {
      const id = +req?.params?.id

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }

      const selectedTodo = await prisma.todo.findFirst({where: {id: id}});

      return !selectedTodo
         ? res.status(404).json({
               msg: `Not found a todo with id: ${id}`,
            })
         : res.status(200).json({
               data: selectedTodo,
            })
   }

   createTodo = async ( req: Request, res: Response ) => {
      
      const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

      if ( error ) return res.status(400).json({
        msg: error
      });
      
      const todo = await prisma.todo.create( { data: createTodoDto! } );

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
      
      const selectedTodo = await prisma.todo.update({
         data: updateTodoDto!,
         where: { id }
      });

      if (!selectedTodo) {
         return res.status(404).json({
           msg: `Todo with id ${id} not found`,
         });
      }
      res.status(200).json({
        msg: 'Todo updated',
        data: selectedTodo
      });
   }

   deleteTodo = async (req: Request, res: Response) => {
      const id  = +req?.params?.id; 

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }
      let selectedTodo = await prisma.todo.findUnique({ where: { id } });

      if (!selectedTodo) {
         return res.status(404).json({
           msg: `Todo with id ${id} not found`,
         });
      }

      await prisma.todo.delete( { where: { id } } );
      return res.status(200).json({
        data: selectedTodo,
      });
   }
}