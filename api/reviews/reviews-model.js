const db = require("../../data/db-config");

module.exports = {
  findAll,  
  findById,
  findBy,
  remove,
  modify,
  add,
  update,
};

function findAll(){
    return db("reviews")
}

function findById(id) {
  return db("reviews").where({ review_id: id }).first();
}

function findBy(filter) {
  return db("reviews").where(filter);
}


function remove(review_id) {
  return db("reviews").where({ review_id }).del();
}

function modify(id, changes){
  return db("reviews")
  .where({review_id: id})
  .update(changes)
  .then(()=>{
    return findById(id)
  })
}

async function add(review) {
  console.log(review);
  const [id] = await db("reviews").insert(review);
  return findById(id);
}

function update(id, changes) {
  return db("reviews").where({ id }).update(changes, "*");
}
