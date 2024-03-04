import { Server } from "./presentation/server";

( async () => {
   main()
})()

async function main() {
   console.log('<--------------- JK App --------------->');
   console.log('main');
   const server = new Server();
   await server.start();
}