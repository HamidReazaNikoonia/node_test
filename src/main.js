
const path = require('path');

const App = require('./app/App');

// The port number that would be exposed by web server.
const httpPort = process.env.PORT || 3000;

// The pathname of json file that static data are read from.
const dbPathname = process.env.DB_PATH || path.join(__dirname, '/../database.json');

console.log(path.resolve(__dirname, '/../database.json'));

const app = new App({
    dbPathname,
    httpPort,
});

app.up();
