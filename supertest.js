var app = require('./app');

var request = require('supertest');

describe('rectangle', function(){

    it('should GET all rectangles', function(done){

        request(app)
        .get('/rectangle')
        .set('Accept', 'application/json')
        .expect('Content-Type', '/json/')
        .expect(200)
        .done(function(err, resp){

            expect(resp.id).toBeDefined();
            done();
        });

    });
});