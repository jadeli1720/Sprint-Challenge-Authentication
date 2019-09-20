const Auth = require('./auth-model.js');
const db = require('../database/dbConfig.js');

describe('Auth module', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    //testing the environment
    // it('should set the environment to testing', () => {

    //     expect(process.env.DB_ENV).toBe('testing')
    // });

    describe('add()', () => {
        it('should add user to db', async () => {
            await Auth.add({name: "Jade"});
            let user = await db('users');
            expect(user).toHaveLength(1);
        })

        it('should add user name into the db', async () => {
            const [id] = await Auth.add({ name: 'Jade' });
            //checking against the database
            let user = await db('users')
                .where({ id })
                .first()
            expect(user.name).toBe('Jade');

        });
    })
})