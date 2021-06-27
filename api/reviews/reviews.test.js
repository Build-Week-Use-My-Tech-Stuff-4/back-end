const db = require("../../data/db-config");
const request = require("supertest");
const server = require("../server");
const Reviews = require("./reviews-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});
//Model tests
describe("Reviews", () => {
  describe("sanity", () => {
    test("Reviews is defined", () => {
      expect(Reviews).toBeDefined();
    });
  });
  describe("findAll()", () => {
    it("resolves to list of reviews", async () => {
      let reviews = await Reviews.findAll();
      expect(reviews).toHaveLength(0);
      await db("reviews").insert({
        review_id: 1,
        review_text: "Best test ever!",
      });
      reviews = await Reviews.findAll();
      expect(reviews).toHaveLength(1);
      await db("reviews").insert({
        review_id: 2,
        review_text: "Second best test ever!",
      });
      reviews = await Reviews.findAll();
      expect(reviews).toHaveLength(2);
    });
    it("reviews are the correct shape", async () => {
      await db("reviews").insert({ review_text: "Yet another review" });
      let reviews = await Reviews.findAll();
      console.log("reviews", reviews);
      expect(reviews[2]).toMatchObject(
        {
          review_id: 3,
          review_text: "Yet another review",
          stars: null,
          reviewer_id: null,
          reviewed_item_id: null,
        },
      );
    });
  });
});
