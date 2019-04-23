
const Koa = require('koa');
const StaticDatabase = require('./StaticDatabase');
const CreateApiRouter = require('./CreateApiRouter');

class App {

    constructor(config) {
        this.config = config;
    }

    up() {

        // instance of static database
        const db = new StaticDatabase(this.config.dbPathname);

        // initial routes map ( controller )
        const router = CreateApiRouter(db);

        const koa = new Koa();

        // Handle output for undefined route path
        koa.use(async (ctx, next) => {

            try {
                let result = await next();
                ctx.body = {
                    'status': 'OK',
                    'result': result,
                };
            }
            catch (e) {
                ctx.body = {
                    'status': 'ERROR',
                    'result': e.message,
                };
            }
        });

        koa.use(router.routes())
            .use(router.allowedMethods());

        koa.listen(this.config.httpPort, () => {
          process.env.DEBUG && console.log(`app listening on port ${this.config.httpPort}!`)
        });

        // log error when errors happen on app
        koa.on('error', (err, ctx) => {
          process.env.DEBUG && console.error('server error', err, ctx)
        });

        return koa;
    }
}

module.exports = App;
