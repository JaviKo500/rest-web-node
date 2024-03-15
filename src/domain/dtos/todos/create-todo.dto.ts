export class CreateTodoDto {
   private constructor(
      public readonly text: string,
      public readonly completedAt: Date,
   ) {
      
   }

   static create( props: { [key: string]: any } ): [string?, CreateTodoDto?] {

      const { text, completedAt } = props;

      if ( !text ) return [ 'Text property is required', undefined ];




      return [ undefined, new CreateTodoDto( text, completedAt ) ];
   }
}
