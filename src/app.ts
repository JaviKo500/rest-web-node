import { envs } from "./config/envs";
import { Server } from "./presentation/server";

( async () => {
   main()
})()

async function main() {
   console.log('<--------------- JK App --------------->');
   console.log('main');
   const server = new Server( { port: envs?.PORT ?? 3000, public_path: envs.PUBLIC_PATH } );
   await server.start();
}