import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

( async () => {
   main()
})()

async function main() {
   console.log('<--------------- JK App --------------->');
   console.log('main');
   const server = new Server( { 
      port: envs?.PORT ?? 3000, 
      public_path: envs.PUBLIC_PATH,
      routes: AppRoutes.routes,
   } );
   await server.start();
}