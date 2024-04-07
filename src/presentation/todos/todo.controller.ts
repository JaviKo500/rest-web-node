import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos';
import { Request, Response} from 'express';
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, updateTodo } from '../../domain';

export class TodoController {
   // * dependencies injected
   constructor(
      private readonly todoRepository: TodoRepository
   ) {

   }

   public handleError = (res: Response, error: unknown) => {
      if ( error instanceof CustomError) {
         return res.status(error.statusCode).json({
           err: error.message,
         });
      }

      res.status(500).json({
        error: 'Internal Server Error check logs',
      });
   }
   public getListTodo = (req: Request, res: Response) => {

      new GetTodos( this.todoRepository )
         .execute()
         .then( todos => res.status(200).json({
            data: todos,
         }))
         .catch( err => this.handleError( res, err ));
   }

   public getTodoById = (req: Request, res: Response) => {
      const id = +req?.params?.id

      new GetTodo( this.todoRepository )
         .execute( id )
         .then( todo => res.status(200).json({
            data: todo,
         }))
         .catch( err =>  this.handleError( res, err ));
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
          .catch( err => this.handleError( res, err ));
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
       .catch( err => this.handleError( res, err ));
   }

   deleteTodo = (req: Request, res: Response) => {
      const id  = +req?.params?.id; 

      new DeleteTodo( this.todoRepository )
         .execute( id )
         .then( todo => res.status(200).json({
            msg: 'ok',
            data: todo,
          }))
          .catch( err => this.handleError( res, err ));
   }
}