
const Koa = require('koa');
const StaticDatabase = require('./StaticDatabase');
const CreateApiRouter = require('./CreateApiRouter');

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
            console.log(`Example koa app listening on port ${this.config.httpPort}!`)
        });

        return koa;
    }
}

module.exports = App;