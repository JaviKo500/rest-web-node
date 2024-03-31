import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos';
import { Request, Response} from 'express';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, updateTodo } from '../../domain';

export class TodoController {
   // * dependencies injected
   constructor(
      private readonly todoRepository: TodoRepository
   ) {

   }

   public getListTodo = (req: Request, res: Response) => {

      new GetTodos( this.todoRepository )
         .execute()
         .then( todos => res.status(200).json({
            data: todos,
         }))
         .catch( err => res.status(400).json({ err: err.message }));
   }

   public getTodoById = (req: Request, res: Response) => {
      const id = +req?.params?.id

      new GetTodo( this.todoRepository )
         .execute( id )
         .then( todo => res.status(200).json({
            data: todo,
         }))
         .catch( err =>  res.status(400).json({ err: err.message }) );
   }

   createTodo = ( req: Request, res: Response ) => {
      
      const [ error, createTodoDto ] = CreateTodoDto.create( req.body );

      if ( error ) return res.status(400).json({
        msg: error
      });
      
      new CreateTodo( this.todoRepository )
         .execute( createTodoDto! )
         .then( todo => res.status(201).json({
            msg: 'ok',
            data: todo,
          }))
          .catch( err => res.status(400).json({ err: err.message }) );
   }

   updateTodo = async ( req: Request, res: Response ) => {
      
      const id  = +req?.params?.id; 
      const [ error, updateTodoDto ] = UpdateTodoDto.update( {...req.body, id}  );

      if ( error ) {
         return res.status(400).json({
           msg: error
         });
      }
      new updateTodo( this.todoRepository )
      .execute( updateTodoDto! )
      .then( todo => res.status(200).json({
         msg: 'ok',
         data: todo,
       }))
       .catch( err => res.status(400).json({ err: err.message }) );
   }

   deleteTodo = (req: Request, res: Response) => {
      const id  = +req?.params?.id; 

      new DeleteTodo( this.todoRepository )
         .execute( id )
         .then( todo => res.status(200).json({
            msg: 'ok',
            data: todo,
          }))
          .catch( err => res.status(400).json({ err: err.message }) );
   }
}