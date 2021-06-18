const db = require("../../data/db-config");

module.exports = {
  findAll,
  findById,
  findBy,
  remove,
  add,
};

function findAll() {
  return db("users");
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").where({ filter });
}

function remove(id) {
  return db("users").where({ id }).del();
}
async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}
