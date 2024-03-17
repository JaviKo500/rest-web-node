export class TodoEntity {
   constructor(
      public id: number,
      public text: string,
      public completedAt?: Date | null,
   ) {
      
   }

   get isCompleted() {
      return !!this.completedAt;
   }

   static fromObject = ( object: { [key: string]: any } ) => {
      const { id, text, completedAt } = object;
      if ( !id ) throw new Error('id is required');
      if ( !text ) throw new Error('id is required');
      
      let newCompletedAt;
      if ( completedAt ) {
         newCompletedAt = new Date(completedAt);
         if ( isNaN( newCompletedAt.getTime()) ) {
            throw new Error('completedAt is not a valid date');
         }
      }
      return new TodoEntity(id, text, newCompletedAt);
   }
}