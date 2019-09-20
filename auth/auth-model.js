const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    findById
};

//Used for Registration ----> Add User

function findById(id) {
    return db ('users')
            .where({ id })
            .first()
};

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
};

function findBy(filter) {
    return db('users')
        .where(filter);
};




