
const Router = require('koa-router');
const ApiError = require('./ApiError');

const CreateApiRouter = (db) => {

    let router = new Router();

    router.get('/:apiVersion/humans', async (ctx, next) => {

        let humans = await db.findAllHumans();

        // Provide all required api fields.
        humans = humans.map(human => ({
            name: human['name'],
            age: human['age'],
        }));

        return humans;
    });

    router.get('/:apiVersion/humans/:name/pets', async (ctx, next) => {

        let {name} = ctx.params;

        // A simple validation
        if (!name || name.length > 50) {
            throw new ApiError('Name is not valid');
        }

        let human = await db.findHumanByName(name);

        // Couldn't find human by given name
        if (!human) {
            throw new ApiError('Human doesn\'t exist.');
        }

        // Check policy
        if (human['privatePetsStatus'] === 'active' && human['age'] > 30) {

            // If any user marked his pets information private, return empty list.
            return [];
        }

        // Load all pets.
        let pets = await db.getAllPetsOfHuman(human);

        // Provide all required api fields.
        pets = pets.map(pet => ({
            name: pet['name'],
            type: pet['type'],
        }));

        return pets;
    });

    return router;
};

module.exports = CreateApiRouter;
