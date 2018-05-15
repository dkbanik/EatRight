var app = require('./server');

var request = require('supertest');

var chai = require('chai').expect;

describe('rectangle', function(){

    it('should GET all rectangles', function(done){

        request(app)
        .get('/rectangle')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
            chai(res.body).to.be.an('array');
            //expect(resp.id).toBeDefined();
            done();
        });

    });

    it('should create a rectangle', function(done) {

        request(app)
        .post('/rectangle')
        .send({
            height: 456,
            width: 567
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(er, res){
            chai(res.body).to.include.all.keys('id','height','width');
            chai(res.body.height).to.equal(456);
            chai(res.body.width).to.equal(567);
            done();
        })
    });

    it('should update a rectangle', function(done){

        request(app)
        .put('/rectangle')
        .send({
            id: 1,
            height : 55,
            width : 'something'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res){

            chai(res.body).to.include.all.keys('id','height','width');
            chai(res.body.height).to.equal(55);
            chai(res.body.width).to.equal('something');
            done();
        })
    });

    it('should delete a rectangle', function(done){

        request(app)
        .delete('/rectangle/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){

            chai(res.body.message).to.equal(null);
            chai(res.body.content).to.equal('Rectangle Removed');
            done();
        })
    });
});