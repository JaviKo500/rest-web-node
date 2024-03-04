import { readFileSync } from 'fs';
import http2, {  } from 'http2';

const server = http2.createSecureServer( {
   key: readFileSync('./keys/server.key'),
   cert: readFileSync('./keys/server.crt'),
}, ( req, res ) => {
   console.log('<--------------- JK App --------------->');
   const path = req.url;
   console.log(path);
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
      return;
   }

   if ( path?.includes('js/')  || path?.includes('css/') ) {
      const scriptFile = readFileSync(`./public${path}`, 'utf-8');
      res.writeHead(200, { 'Content-Type': path?.includes('css/') 
      ?  'text/css'
      : 'application/javascript' });
      res.write(scriptFile);
      res.end();
      return;
   }
   
   const htmlFile = readFileSync('./public/404.html', 'utf-8');
   res.writeHead(404, { 'Content-Type': 'text/html' });
   res.write(htmlFile);
   res.end();
   return;

});

server.listen( 8080, () => {
   console.log('<--------------- JK App --------------->');
   console.log('run server in 8080');
});