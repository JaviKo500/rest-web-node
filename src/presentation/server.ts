import express from 'express';
import path from 'path';

interface Options {
   port: number;
   public_path?: string;
}
export class Server {
   
   private app = express();

   private readonly port: number;
   private readonly publicPath: string;
   
   constructor( options: Options ) {
      const { port, public_path = 'public' } = options;
      this.port = port;
      this.publicPath = public_path;
   }
   async start () {

      // * middlewares
      // * public folders
      this.app.use( express.static(this.publicPath) );

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