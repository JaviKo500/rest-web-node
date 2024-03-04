import express from 'express';
import path from 'path';
export class Server {
   
   private app = express();
   
   async start () {

      // * middlewares
      // * public folders
      this.app.use( express.static('public') );

      this.app.get( '*', ( req, res ) => {
         const indexPath = path.join( __dirname, '../../public/index.html' );
         console.log('<--------------- JK Server --------------->');
         console.log(req.url);
         res.sendFile(indexPath)
         return;
      });
      this.app.listen( 3000, () => {
         console.log('<--------------- JK Server --------------->');
         console.log(`server running port ${3000}`);
      })
   }

}