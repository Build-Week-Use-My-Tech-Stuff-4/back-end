const db = require('../../data/db-config')

module.exports = {
    findAll,
    findById
}

function findAll(){
    return db("users")
}

function findById(user_id){
    return db("users")
    .where({user_id})
    .first()
}