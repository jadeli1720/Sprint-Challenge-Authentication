const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    findById
};

//Used for Registration ----> Add User

function findById(id) {
    return null
}

function add(user) {
    return db('users')
        .insert(user, 'id');
}

function findBy(id) {
    return null
}




