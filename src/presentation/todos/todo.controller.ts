import { Request, Response} from 'express';

export class TodoController {
   // * dependencies injected
   constructor() {

   }

   public getListTodo = (req: Request, res: Response) => {
      return res.status(200).json({
         data: [
            { id: 1, text: 'But milk', createAt: new Date() },
            { id: 1, text: 'But milk', createAt: new Date() },
            { id: 1, text: 'But milk', createAt: new Date() },
         ],
      });
   }
}