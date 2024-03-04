import { readFileSync } from 'fs';
import http, { IncomingMessage } from 'http';

const server = http.createServer(( req: IncomingMessage, res ) => {
   console.log('<--------------- JK App --------------->');
   const path = req.url;
   console.log();
   // res.writeHead(200, { 'Content-Type': 'text/html' });
   // res.write( `<h1>Hello world ${req.url}</h1>`);
   // res.end();

   const data  = {
      name: 'John Smith',
      age: 36,
      city: 'San Francisco',
   };

   // res.writeHead(200, { 'Content-Type': 'application/json' });
   // res.end( JSON.stringify(data) );

   if ( path === '/' ) {
      const htmlFile = readFileSync('./public/index.html', 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(htmlFile);
      res.end();
   } else {
      const htmlFile = readFileSync('./public/404.html', 'utf-8');
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(htmlFile);
      res.end();
   }

});

server.listen( 8080, () => {
   console.log('<--------------- JK App --------------->');
   console.log('run server in 8080');
});