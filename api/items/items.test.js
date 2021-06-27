const db = require("../../data/db-config");
const request = require("supertest");
const server = require("../server");
const Items = require("./items-model");
const { expectCt } = require("helmet");

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
    describe('sanity', () => {
        test('Items is defined', () => {
          expect(Items).toBeDefined()
        })
      }) 

});
