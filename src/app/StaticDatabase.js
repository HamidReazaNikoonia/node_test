
class StaticDatabase {

    constructor(dbPathname) {

        // Load entire static data
        this.data = require(dbPathname);
    }

    findAllHumans() {
        return this.data['humans'];
    }

    findHumanByName(name) {
        return this.data['humans']
            .filter(human => human['name'] === name)[0];
    }

    getAllPetsOfHuman(human) {
        return this.data['pets']
            .filter(pet => pet['ownerId'] === human['id']);
    }
}

module.exports = StaticDatabase;