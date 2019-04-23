
const request = require('supertest');
const chai = require('chai');
const path = require('path');
const App = require('./app/App');

// The port number that would be exposed by web server.
const httpPort = 3000;

// The pathname of json file that static data are read from.
const dbPathname = path.join(__dirname, '/../database.json');

console.log(path.resolve(__dirname, '/../database.json'));

const app = new App({
    dbPathname,
    httpPort,
});

const server = app.up().callback();

describe('test entire api methods', () => {

    it('could list all humans', () => {
        request(server)
            .get('/v1/humans')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                chai.assert(response.body.status, 'OK');
                chai.expect(response.body.result).to.be.a('array');
            });
    });

    it('could list all pets of Jack', () => {
        request(server)
            .get('/v1/humans/Jack/pets')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                chai.assert(response.body.status, 'OK');
                chai.expect(response.body.result).to.be.a('array');
            });
    });
});

