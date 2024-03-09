import { Request, Response} from 'express';

const listTodo =  [
   { id: 1, text: 'But milk', createAt: new Date() },
   { id: 2, text: 'But cheese', createAt: new Date() },
   { id: 3, text: 'But bread', createAt: new Date() },
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


}