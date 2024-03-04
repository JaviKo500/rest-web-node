import express from 'express';
export class Server {
   
   private app = express();
   
   async start () {

      // * middlewares
      // * public folders
      this.app.use( express.static('public') )
      this.app.listen( 3000, () => {
         console.log('<--------------- JK Server --------------->');
         console.log(`server running port ${3000}`);
      })
   }

}