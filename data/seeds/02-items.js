exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          id: 1,
          item_name: "The answer to life, the universe and everything",
          description: "The answer to life, the universe and everything, like I said.",
          location: "Kansas City",
          lister_id: 2,
          price_per_day: 42.0,
          available: true,
        },
        {
          id: 2,
          item_name: "Jar of dirt",
          description: "A jar of dirt",
          location: "Miami",
          lister_id: 3,
          price_per_day: 27,
          available: true,
        },
        {
          id: 3,
          item_name: "The One Ring",
          description: "One ring to rule them all,one ring to find them,One ring to bring them all and in the darkness bind them.",
          location: "Kansas City",
          lister_id: 4,
          price_per_day: 12,
          available: false,
        },
        {
          id: 4,
          item_name: "test item 1",
          description: "item #1",
          location: "in the db",
          lister_id: 1,
          price_per_day: 5,
          available: true,
        },
        {
          id: 5,
          item_name: "test item 2",
          description: "item #2",
          location: "in the db",
          lister_id: 1,
          price_per_day: 10.1,
          available: false,
        },
         {
          id: 6,
          item_name: "test item 3",
          description: "item #3",
          location: "in the db",
          lister_id: 1,
          price_per_day: 20.03,
          available: true,
        },
    
      ]);
    });
};
