
const Koa = require('koa');
const StaticDatabase = require('./StaticDatabase');
const CreateApiRouter = require('./CreateApiRouter');
const ApiError = require('./ApiError');

class App {

    constructor(config) {
        this.config = config;
    }

    up() {

        const db = new StaticDatabase(this.config.dbPathname);

        const router = CreateApiRouter(db);

        const koa = new Koa();

        // Handle output
        koa.use(async (ctx, next) => {

            try {
                let result = await next();
                ctx.status = 200;
                ctx.body = {
                    'status': 'OK',
                    'result': result,
                };
            }
            catch (e) {
                if (e instanceof ApiError) {
                    ctx.status = 400;
                    ctx.body = {
                        'status': 'ERROR',
                        'result': e.message,
                    };
                }
                else {
                    if (e instanceof ApiError) {
                        ctx.status = 500;
                        ctx.body = {
                            'status': 'ERROR',
                            'result': 'Internal Error',
                        };
                    }
                }
            }
        });

        koa.use(router.routes())
            .use(router.allowedMethods());

        koa.listen(this.config.httpPort, () => {
             console.log(`app listening on port => ${this.config.httpPort}!`)
        });

        koa.on('error', err => {
          process.env.DEBUG && log.error('server error', err)
        });

        return koa;
    }
}

module.exports = App;
