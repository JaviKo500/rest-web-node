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
   test( 'should return a 404 not found api/todo/:id', async () => {
      const todoId = 999;
      const { body } = await request(testServer.app)
         .get(`/api/todo/${todoId}`)
         .expect(400);
      expect( body ).toEqual({ err: `Todo with ${todoId} not found ` });
   });
   test( 'should return a new todo api/todo', async () => {
      const { body } = await request( testServer.app )
         .post( '/api/todo' )
         .send( todo1 )
         .expect( 201 );
      expect( body.data ).toEqual({
         id: expect.any( Number ),
         text: todo1.text,
         completedAt: expect.any(String)
      });
   });

   test( 'should return an error if text in not valid api/todo', async () => {
      const { body } = await request( testServer.app )
         .post( '/api/todo' )
         .send( { } )
         .expect( 400 );
      expect( body ).toEqual({ msg: 'Text property is required' });
   });
   test( 'should return an error if text is empty api/todo', async () => {
      const { body } = await request( testServer.app )
         .post( '/api/todo' )
         .send( { text:'' } )
         .expect( 400 );
      expect( body ).toEqual({ msg: 'Text property is required' });
   });

   test( 'should return an updated todo api/todo/:id', async () => {
      const todo = await prisma.todo.create( { data: todo1 } );
      const { body } = await request( testServer.app )
         .put( `/api/todo/${todo.id}` )
         .send( { text: 'test updated', completedAt: '2023-10-21' } )
         .expect( 200 );

      expect( body.data ).toEqual({
         id: expect.any( Number ),
         text: 'test updated',
         completedAt: '2023-10-21T00:00:00.000Z'
      });
   });

   test( 'should return 404 if todo not found', async () => {
      const idTodo = 999;
      const { body } = await request( testServer.app )
         .put( `/api/todo/${idTodo}` )
         .send( { text: 'test updated', completedAt: '2023-10-21' } )
         .expect( 400 );
      expect( body ).toEqual({ err: 'Todo with 999 not found ' });
   });

   test( 'should return an updated todo only date', async () => {
      const todo = await prisma.todo.create( { data: todo1 } );
      const { body } = await request( testServer.app )
         .put( `/api/todo/${todo.id}` )
         .send( { completedAt: '2023-10-21' } )
         .expect( 200 );

      expect( body.data ).toEqual({
         id: expect.any( Number ),
         text: todo1.text,
         completedAt: '2023-10-21T00:00:00.000Z'
      });
   });

   test( 'should return an updated todo only text', async () => {
      const todo = await prisma.todo.create( { data: todo1 } );
      const { body } = await request( testServer.app )
         .put( `/api/todo/${todo.id}` )
         .send( { text: 'test updated' } )
         .expect( 200 );

      expect( body.data ).toEqual({
         id: expect.any( Number ),
         text: 'test updated',
         completedAt: expect.any( String )
      });
   });
});