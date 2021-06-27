const db = require("../../data/db-config");
const request = require("supertest");
const server = require("../server");

beforeAll(async () => {
  await db.migrate.rollback(); // takes back the db to the stone age
  await db.migrate.latest(); // bringing to the latest
});
beforeEach(async () => {
  await db("users").truncate(); // wipes rows, and resets id numbers
});
afterAll(async () => {
  await db.destroy();
});

describe("[POST] /register", () => {
    it("registers a new user and returns it", async () => {
      const newUser = await request(server)
        .post("/api/auth/register")
        .send({ user_name: "test2", password: "1234" });
      console.log("here", newUser.body)
      expect(newUser.body.user.user_name).toEqual("test2");
    });
    
  });
test("sanity", () => {
  expect(true).toBe(true);
});