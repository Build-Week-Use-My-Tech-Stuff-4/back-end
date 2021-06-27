const db = require("../../data/db-config");
const request = require("supertest");
const server = require("../server");
const Items = require("./items-model");
const { expectCt } = require("helmet");
const Users = require("../users/users-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("items").truncate();
});
afterAll(async () => {
  await db.destroy();
});

describe("Items", () => {
  describe("sanity", () => {
    test("Items is defined", () => {
      expect(Items).toBeDefined();
    });
  });
  describe("findAll()", () => {
    it("resolves to list of items", async () => {
      let items = await Items.findAll();
      expect(items).toHaveLength(0);
      await db("items").insert({
        item_name: "Jar of dirt",
        description: "A jar of dirt",
        location: "Miami",
        price_per_day: 27,
        available: true,
      });
      items = await Items.findAll();
      expect(items).toHaveLength(1);
      await db("items").insert({
        item_name: "another item",
        description: "another item",
        location: "Miami",
        price_per_day: 27,
        available: true,
      });
      items = await Items.findAll();
      expect(items).toHaveLength(2);
    });
    it("references user_id with lister_id as foreign key", async () => {
      await db("users").insert({ user_name: "testUser", password: "1234" });
      await db("items").insert({
        item_name: "another item",
        description: "another item",
        location: "Miami",
        price_per_day: 27,
        available: true,
        lister_id: 1,
      });
      items = await Items.findAll();
      expect(items).toHaveLength(1);
    });
  });
});
