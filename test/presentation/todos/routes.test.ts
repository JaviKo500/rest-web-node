import request from "supertest";
import { testServer } from "../../test-server";

request
describe('Routes.test', () => {
   beforeAll( async ()=> {
      await testServer.start();
   });
   test( 'should return todos api/todo', async () => {

      const response = await request( testServer.app )
         .get('/api/todo')
         .expect(200);
      console.log('<--------------- JK Routes.test --------------->');
      console.log(response.body);
   });
});