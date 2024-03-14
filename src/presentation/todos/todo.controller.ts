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
      const { text, completedAt } = req.body;

      if ( !text ) return res.status(400).json({
        msg: 'Text is required',
      });

      const newTodo = {
         text,
         completedAt: completedAt ?? new Date()
      };
      
      const todo = await prisma.todo.create( { data: newTodo } );

      res.status(200).json({
        msg: 'ok',
        data: todo,
      });
   }

   updateTodo = async ( req: Request, res: Response ) => {
      
      const id  = +req?.params?.id; 

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }

     

      const { text, completedAt } = req.body;

      if ( !text ) {
         return res.status(400).json({
           msg: 'Text is required',
         });
      }

      let updateData: any = {
         text
      };

      if ( completedAt ) {
         updateData.completedAt = completedAt;
      }
      
      const selectedTodo = await prisma.todo.update({
         data: updateData,
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