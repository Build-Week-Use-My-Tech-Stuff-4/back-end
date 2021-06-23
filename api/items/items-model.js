const db = require("../../data/db-config");

module.exports = {
  findAll,
  findById,
  findBy,
  remove,
  add,
  update,
};

async function findAll() {
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
    .leftJoin("reviews", "items.item_id", "reviews.reviewed_item_id");

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

function findById(id) {
  return db("items").where({ item_id: id }).first();
}

function findBy(filter) {
  return db("items").where(filter);
}
function remove(id) {
  return db("items").where({ id }).del();
}
async function add(item) {
  console.log(item)
  const[id]= await db("items").insert(item)
  return findById(id)
}

function update(id, changes) {
  return db("items").where({ id }).update(changes, "*");
}
