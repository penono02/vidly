const request = require('supertest');
const {Genre} = require('../../models/genre');
let server;


describe('/', ()=>{
  //You can't share same port for 2 different servers
  //Jest has the following 2 utility functions - access the server before it shares port with your app
  // close it right after it hits the server

   beforeEach(()=>{server = require('../../index');})   //start the server
   afterEach(async()=>{   //shut down the server
   await server.close();
    await Genre.remove({});
  });

    describe('GET /', ()=>{
      it('should return all genres', async ()=>{
        await Genre.collection.insertMany([ //<-- with this method insertMany, you can insert multiple documents
            {name:'genre1'},                //this method returns a promise, so we must precede with await
           {name:'genre2'}
         ]);

        const res = await request(server).get('/');
       expect(res.status).toBe(200);
      //  expect(res.body.length).toBe(2);

    //  await  Genre.remove({}); //<-- clear the body. set body length to zero, if not the lenght will be accumulated every time you run the test
                         //instead of the 2 genre above you'll get 4 genres and so on... but should be done in afterEach function

      //  expect(res.body.some(g => g.name ==='genre1')).toBeTruthy();
       //Better than toBe..toBe is too specific.
      //  expect(res.body.some(g => g.name ==='genre2')).toBeTruthy(); //Remember the expectation can't be too specific or too general

      });

/*      //test routes with parameters
      describe('GET /:id', ()=>{

          it('should return a genre if valid id is passed', async ()=>{

              const genre = new Genre({name:'genre1'});
              await genre.save;

              const res = await request(server).get('/api/genre/' + genre._id);
      //  expect(res.body).toMatchObject(genre);//should failed..mongodb returns string, not object for this, you must use
         expect(res.body).toHaveProperty ('name', genre.name);

          });
      });

    });

    describe('GET /:id', ()=>{

        it('should return 404 if invalid id is passed', async ()=>{

            const res = await request(server).get('/1');
            expect(res.status).toBe(404);
       //expect(res.body).toHaveProperty ('name', genre.name);
        });

    });

/*
  describe('POST /',()=>{

      it('should return 401 is client is not logged in', async ()=>{

      const res= request(server)
              .post('/api/genres')
              .send({name:'genres1'});  //for post request, you must send an object. as if from a web form

          expect(res.status).toBe(401);
      });


  });

*/


});

});
