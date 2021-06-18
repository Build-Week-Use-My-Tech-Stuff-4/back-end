exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, user_name: "test", email: "test1@123.com", password: "1234" },
        {
          id: 2,
          user_name: "Deep Thought",
          email: "test1@123.com",
          password: "1234",
          city: "Kansas City",
          state: "Kansas",
          zip: 66101,
        },
        {
          id: 3,
          user_name: "Capt. Jack Sparrow",
          email: "test2@123.com",
          password: "1234",
          city: "Miami",
          state: "Florida",
          zip: "33101",
        },
        {
          id: 4,
          user_name: "Randalf",
          email: "test3@123.com",
          password: "1234",
          city: "Seattle",
          state: "Wa",
          zip: "98101",
        },
      ]);
    });
};
