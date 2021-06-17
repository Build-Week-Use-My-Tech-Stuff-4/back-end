const db = require('../../data/db-config')

module.exports = {
    findAll,
    findById,
    remove
}

function findAll(){
    return db("users")
}

function findById(id){
    return db("users")
    .where({id})
    .first()
}

// function findByFilter(filter)

function remove(id){
    return db("users")
    .where({id})
    .del()
}