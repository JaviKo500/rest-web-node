import express, { Router } from 'express';
import path from 'path';

interface Options {
   port: number;
   routes: Router;
   public_path?: string;
}
export class Server {
   
   public readonly app = express();

   private readonly port: number;
   private readonly publicPath: string;
   private readonly routes: Router;
   constructor( options: Options ) {
      const { port, public_path = 'public', routes } = options;
      this.port = port;
      this.publicPath = public_path;
      this.routes = routes;
   }
   async start () {

      // * middlewares
      // * public folders
      this.app.use( express.static(this.publicPath) );
      this.app.use( express.json() );
      this.app.use( express.urlencoded( { extended: true } ) );

      // * routes
      this.app.use( this.routes );
      
      // *spa
      this.app.get( '*', ( req, res ) => {
         const indexPath = path.join( __dirname, `../../${this.publicPath}/index.html` );
         console.log('<--------------- JK Server --------------->');
         console.log(req.url);
         res.sendFile(indexPath)
         return;
      });
      
      this.app.listen( this.port, () => {
         console.log('<--------------- JK Server --------------->');
         console.log(`server running port ${this.port}`);
      })
   }

}