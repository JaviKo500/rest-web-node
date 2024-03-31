import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres-data";

request
describe('Routes.test', () => {
   beforeAll( async ()=> {
      await testServer.start();
   });
   afterAll( ()=> {
      testServer.close();
   });

   beforeEach( async () => {
      await prisma.todo.deleteMany();
   })

   const todo1 = { text: 'Hello world 1', completedAt: new Date() };
   const todo2 = { text: 'Hello world 2', completedAt: new Date() };
   test( 'should return todos api/todo', async () => {
      await prisma.todo.createMany({
         data: [ todo1, todo2 ]
      })
      const { body } = await request( testServer.app )
         .get('/api/todo')
         .expect(200);
      expect( body.data ).toBeInstanceOf( Array );
      expect( body.data.length ).toBe( 2 );
      expect( body.data[0].text ).toBe( todo1.text );
      expect( body.data[1].text ).toBe( todo2.text );
   });

   test( 'should return a todo api/todos/:id', async () => {
      const todo = await prisma.todo.create({
         data: todo1
      });

      const { body } = await request(testServer.app)
         .get(`/api/todo/${todo.id}`)
         .expect(200);

      expect( body.data ).toEqual({
         id: expect.any(Number),
         text: todo.text,
         completedAt: expect.any(String),
      });
   });
});