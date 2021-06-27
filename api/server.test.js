const db = require("../data/db-config");
const request = require("supertest");
const server = require("./server");

test("sanity", () => {
  expect(true).toBe(true);
});

describe("Get `/`", () => {
  it("responds with the MOTD", async () => {
    const res = await request(server).get("/");
    console.log(res.status)
    expect(res.status).toEqual(200);
  });
});
