const fs = require('fs');
const path = require('path');

class UserDataProvider {
    constructor() {
        this._cache = null;
        this._dataFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
    }

    async getUsers() {
        if (this._cache) return this._cache;
        try {
            fs.accessSync(this._dataFilePath);
        } catch {
            this._cache = [];
            return this._cache;
        }
        const file$ = fs.createReadStream(
            this._dataFilePath,
            { encoding: 'utf-8' }
        );

        const data = await new Promise((res, rej) => {
            let result = '';
            file$.on('data', data => {
                result += data;
            });

            file$.on('end', () => {
                res(result);
            });

            file$.on('error', rej);
        });
        this._cache = JSON.parse(data);
        return this._cache;
    }

    async getUser(userId) {

        if (!this._cache) {
            this._cache = await this.getUsers();
        }
        userId = +userId;                                           //to number
        return this._cache.find(({ id }) => id === userId);
    }

    async setUser(user) {
        if (!this._cache) {
            this._cache = await this.getUsers();
        }
        if (user.id) {
            this._cache = this._cache.map(e => {
                return e.id === user.id ? user : e;
            });
        } else {
            user = {
                id: Date.now(),
                ...user
            };
            this._cache.push(user);
        }
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            { encoding: 'utf-8' }
        );

        file$.end(JSON.stringify(this._cache));

        return user;
    }

    async deleteUser(userId) {
        if (!this._cache) {
            this._cache = await this.getUsers();
        }
        userId = +userId;                                           //to number
        this._cache = this._cache.filter(({ id }) => id !== userId);
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            { encoding: 'utf-8' }
        );

        file$.end(JSON.stringify(this._cache));
    }
}

const usersProvider = new UserDataProvider();

module.exports = usersProvider;