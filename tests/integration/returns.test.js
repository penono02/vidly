const {Rental} =  require('../../models/rental');
const {User} =  require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns', ()=>{
  let server;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async()=>{
      server = require('../../index');
      customerId = mongoose.Types.ObjectId();
      movieId = mongoose.Types.ObjectId();

       rental = new Rental({
        customer:{
           _id:customerId,
           name: '12345',
           phone:'1234567891'
        },

        movie:{
          _id: movieId,
          title:'movie title',
          dailyRentalRate: 2
        }
      });

      await rental.save();
    })   //start the server


  afterEach(async()=>{   //shut down the server
    await server.close();
    await Rental.remove({});
 });
/*
 it('it should work', async ()=>{
   const result = await Rental.findById(rental._id);
   expect(result).not.toBeNull();
 });

 it('it should return 401 if client is not logged in', async ()=>{
   //here we need to send a post request.
   //to send a request we need to import the supertest module

   const res = await request(server)
   .post('/api/returns')
   .send({customerId, movieId});

   expect(res.status).toBe(401);

});
*/


 it('it should return 400 customerId is not provided', async ()=>{
   //here we need to send a post request.
   //to send a request we need to import the supertest module

   const res = await request(server)
   .post('/api/returns')
   .set('x-auth-token', token)
   .send({movieId});

   expect(res.status).toBe(400);

});
});
