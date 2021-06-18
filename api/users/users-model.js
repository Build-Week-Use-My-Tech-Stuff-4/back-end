const db = require("../../data/db-config");

module.exports = {
  findAll,
  findById,
  findBy,
  remove,
  add,
  update,
};

function findAll() {
  return db("users")
  .select('users.user_id','users.user_name','users.created_on','users.updated_on');
}

function findById(id) {
  return db("users").where({user_id : id} ).first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function remove(id) {
  return db("users").where({ id }).del();
}
async function add(user) {
  // const [id] = 
 return await db("users").insert(user);

  // return findById(id);
}

function update(id, changes){
  return db('users')
  .where({id})
  .update(changes, '*')
}