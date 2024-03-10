import { Request, Response} from 'express';
import { todo } from 'node:test';

let listTodo =  [
   { id: 1, text: 'But milk', completedAt: new Date() },
   { id: 2, text: 'But cheese', completedAt: new Date() },
   { id: 3, text: 'But bread', completedAt: new Date() },
];
export class TodoController {
   // * dependencies injected
   constructor() {

   }

   public getListTodo = (req: Request, res: Response) => {
      return res.status(200).json({
         data: listTodo,
      });
   }
   public getTodoById = (req: Request, res: Response) => {
      const id = +req?.params?.id

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }

      const selectedTodo = listTodo.find( todo => todo.id === id );

      return !selectedTodo
         ? res.status(404).json({
               msg: `Not found a todo with id: ${id}`,
            })
         : res.status(200).json({
               data: selectedTodo,
            })
   }

   createTodo = ( req: Request, res: Response ) => {
      const { text } = req.body;

      if ( !text ) return res.status(400).json({
        msg: 'Text is required',
      });

      const newTodo = {
         id: listTodo.length + 1,
         text,
         completedAt: new Date()
      };

      listTodo.push( newTodo );
      
      res.status(200).json({
        msg: 'ok',
      });
   }

   updateTodo = ( req: Request, res: Response ) => {
      
      const id  = +req?.params?.id; 

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }

      const selectedTodo = listTodo.find( todo => todo.id === id );

      if (!selectedTodo) {
         return res.status(404).json({
           msg: `Todo with id ${id} not found`,
         });
      }

      const { text, completedAt } = req.body;

      if ( !text ) {
         return res.status(400).json({
           msg: 'Text is required',
         });
      }

      if ( completedAt ) {
         selectedTodo.text = completedAt;
      }
      selectedTodo.text = text;

      res.status(200).json({
        msg: 'Todo updated',
      });
   }

   deleteTodo = (req: Request, res: Response) => {
      const id  = +req?.params?.id; 

      if ( !id || isNaN(id)) {
         return res.status(400).json({
           msg: 'id is invalid',
         });
      }
      let selectedTodo = null;
      listTodo  = listTodo.filter( todo => {
         if ( todo.id !== id ) {
            return todo;
         }

         selectedTodo = todo;
      });
   

      if (!selectedTodo) {
         return res.status(404).json({
           msg: `Todo with id ${id} not found`,
         });
      }

      return res.status(200).json({
        data: selectedTodo,
      });
   }
}