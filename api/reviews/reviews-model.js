const db = require("../../data/db-config");

module.exports = {
  findAll,  
  findById,
  remove,
  add,
  update,
};

function findAll(){
    return db("reviews")
}

function findById(id) {
  return db("reviews").where({ review_id: id }).first();
}
function remove(id) {
  return db("reviews").where({ id }).del();
}
async function add(review) {
  console.log(review);
  const [id] = await db("reviews").insert(review);
  return findById(id);
}

function update(id, changes) {
  return db("reviews").where({ id }).update(changes, "*");
}
