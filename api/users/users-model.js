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
  return db("users").select(
    "users.user_id",
    "users.user_name",
    "users.created_on",
    "users.updated_on"
  );
}
//I think I need to break this out into two seperate tasks, the forEach seems to be running multiple times the way it is written

async function findById(user_id) {
  const withItemsAndReviews = await db("users")
    .select(
      "users.user_id",
      "users.user_name",
      "items.item_id",
      "items.item_name",
      "reviews.review_id",
      "reviews.reviewed_item_id"
    )
    .leftJoin("items", "users.user_id", "items.lister_id")
    .leftJoin("reviews", "users.user_id", "reviews.reviewer_id")
    .where("users.user_id", user_id);

  if (!withItemsAndReviews.length) return null;

  const user = {
    user_id: +user_id,
    user_name: withItemsAndReviews[0].user_name,
    items: [],
    reviews: [],
  };
  //this is where the problem is. it loops through but returns 9 items if there are 3, 4 if there are 2, etc.
  const itemsArray = [];

  withItemsAndReviews.forEach((item) => {
    itemsArray.push({
      item_id: item.item_id,
      item_name: item.item_name,
    });
  });

  const reviewsArray = [];

  withItemsAndReviews.forEach((review) => {
    reviewsArray.push({
      review_id: review.review_id,
      reviewed_item_id: review.reviewed_item_id,
    });
  });
  return { ...user, items: itemsArray, reviews: reviewsArray };
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

function update(id, changes) {
  return db("users").where({ id }).update(changes, "*");
}
