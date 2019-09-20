const Auth = require('./auth-model.js');
const db = require('../database/dbConfig.js');

//when running a test environment need to use :npx knex migrate:latest --env=testing to test the database

describe('Auth module', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })

    //testing the environment
    it('should set the environment to testing', () => {

        expect(process.env.DB_ENV).toBe('testing')
    });

    describe('add()', () => {
        it('should add user to db', async () => {
            await Auth.add({username: "David", password: 'password'});
            let user = await db('users');
            expect(user).toHaveLength(1);
        })

        // it('should add user name into the db', async () => {
        //     const [id] = await Auth.add({ username: "David", password: 'password' });
        //     //checking against the database
        //     let user = await db('users')
        //         .where({ id })
        //         .first()
        //     expect(user.username).toBe('David');

        // });
    })
})