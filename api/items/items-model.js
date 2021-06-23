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

function findAll() {
 return db("items")
}

async function findById(id) {
const itemsWithReviews = await db("items")
.select(
  "items.item_id",
  "items.item_name",
  "items.description",
  "items.location",
  "items.price_per_day",
  "items.available",
  "items.lister_id",
  "reviews.review_id",
  "reviews.reviewed_item_id",
  "reviews.reviewer_id",
  "reviews.review_text",
  "reviews.stars"
)
.leftJoin("reviews", "items.item_id", "reviews.reviewed_item_id")
.where("items.item_id", id)

if (!itemsWithReviews.length) return null;

const item = {
item_id: itemsWithReviews[0].item_id,
item_name: itemsWithReviews[0].item_name,
description: itemsWithReviews[0].description,
location: itemsWithReviews[0].location,
price_per_day: itemsWithReviews[0].price_per_day,
available: itemsWithReviews[0].available,
lister_id: itemsWithReviews[0].lister_id,
reviews: [],
};
const reviewsArray = [];

itemsWithReviews.forEach((review) => {
reviewsArray.push({
  review_id: review.review_id,
  review_text: review.review_text,
  stars: review.stars,
  reviewer_id: review.review_id,
  reviewed_item_id: review.reviewed_item_id,
});
});
return { ...item, reviews: reviewsArray };
}

function findBy(filter) {
  return db("items").where(filter);
}
function remove(item_id) {
  return db("items").where({ item_id }).del();
}


function modify(id, changes){
  return db("items")
  .where({item_id: id})
  .update(changes)
  .then(()=>{
    return findById(id)
  })
}


async function add(item) {
  const[id]= await db("items").insert(item)
  return findById(id)
}

function update(id, changes) {
  return db("items").where({ id }).update(changes, "*");
}


