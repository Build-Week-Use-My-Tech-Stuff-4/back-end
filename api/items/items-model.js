const db = require("../../data/db-config")

module.exports = {
    findAll,
    findById,
     findBy,
     remove,
     add,
     update
}

function findAll(){
    return db("items")
}

function findById(id){
    return db("items").where({item_id: id}).first();
}

function findBy(filter){
    return db("items").where(filter);
}
function remove(id) {
    return db("items").where({ id }).del();
  }
  async function add(item) {
   
   return await db("users").insert(item);
  
  }
  
  function update(id, changes){
    return db('items')
    .where({id})
    .update(changes, '*')
  }