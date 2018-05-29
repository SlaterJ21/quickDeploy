var request = require('supertest');
var server = require('../server');

describe('basic skeleton of the routes', function(){


  it('should respond with a 200 status code to a get (all) request for cookies', function(done){

    request(server)
    .get('/cookies')
    .set('Accept', 'application/json')
    .expect(200, done);
  });

  it('should respond with the param id to a get (one) request for a cookie', function(done){

    request(server)
    .get('/cookies/2')
    .set('Accept', 'application/json')
    .expect("2", done);
  });

  it('should respond with the request body when a post request is received', function(done){
    request(server)
    .post('/cookies')
    .set('Accept', 'application/json')
    .send({"id":"4","name":"Chocolate Chip Cookie"})
    .expect({"id":"4","name":"Chocolate Chip Cookie"}, done);
  });

  it('should respond to a patch request with the param id and the name of the cookie from the request body', function(done){

    request(server)
    .patch('/cookies/1')
    .set('Accept', 'application/json')
    .send({ name: "Oatmeal Cookie" })
    .expect({ id:"1", name: "Oatmeal Cookie" }, done);

  });

  it('should respond to a delete request with the param id of the cookie that was deleted', function(done){

      request(server)
      .delete('/cookies/2')
      .expect("2", done);

    });
});

describe('error handling', function(){
  it('should send a 418 status code for all other routes', function(done){

    request(server)
    .get('/asdfg')
    .expect(418, done);
  });

});
