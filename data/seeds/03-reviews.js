exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("reviews").insert([
        {
          review_id: 1,
          reviewed_item_id: 1,
          reviewer_id: 4,
          review_text: "Perfect! Just what I needed.",
          stars: 5,
        },
        {
          review_id: 2,
          reviewed_item_id: 1,
          reviewer_id: 3,
          review_text: "I wrote the answer on my palm and it washed off.",
          stars: 2,
        },
        {
          review_id: 3,
          reviewed_item_id: 2,
          reviewer_id: 3,
          review_text: `It's better than anything you've got!`,
          stars: 5,
        },
        {
          review_id: 4,
          reviewed_item_id: 2,
          reviewer_id: 2,
          review_text: "It is literally just a jar of dirt.",
          stars: 1,
        },
        {
          review_id: 5,
          reviewed_item_id: 4,
          reviewer_id: 1,
          review_text: "test",
          stars: 5,
        },
        {
          review_id: 6,
          reviewed_item_id: 5,
          reviewer_id: 1,
          review_text: "test",
          stars: 5,
        },
        {
          review_id: 7,
          reviewed_item_id: 6,
          reviewer_id: 1,
          review_text: "test",
          stars: 5,
        },
      ]);
    });
};
