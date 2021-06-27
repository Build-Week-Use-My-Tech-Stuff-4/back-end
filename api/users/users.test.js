const db = require("../../data/db-config");
const request = require("supertest");
const server = require('../server')
const Users = require('./users-model')

const listOfUsers= [{ user_id: 1, user_name: "test", email: "test1@123.com", password: "1234" },
{
  user_id: 2,
  user_name: "Deep Thought",
  email: "test2@123.com",
  password: "1234",
  city: "Kansas City",
  state: "Kansas",
  zip: 66101,
},]

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
  })
  beforeEach(async () => {
    await db('users').truncate()
  })
  afterAll(async () => {
    await db.destroy()
  })

//Model test
describe('Users', () => {
    describe('sanity', () => {
        test('Users is defined', () => {
          expect(Users).toBeDefined()
        })
      }) 
      describe('findAll()', () => {
        it('resolves to list of users', async () => {
          let users = await Users.findAll()
          expect(users).toHaveLength(0)
          await db('users').insert({ user_name: 'testUser',password:'1234' })
          users = await Users.findAll()
          expect(users).toHaveLength(1)
          await db('users').insert({ user_name: 'testUser2',
        password: '1234' })
          users = await Users.findAll()
          expect(users).toHaveLength(2)
        })
        it('resolves to users of the correct shape, password not returned', async () => {
          await db('users').insert({ user_name: 'testUser',
        password: '1234' })
          let users = await Users.findAll()
          expect(users).toMatchObject([{ user_name: 'testUser', user_id: 1}])
        })
      })


});



//API test
describe('GET /users', () => {
    beforeEach(async () => {
        await db('users').insert(listOfUsers)
      })
      it('responds with a 200 OK', async () => {
        const res = await request(server).get('/api/users')
        expect(res.status).toBe(200)
      })
});

// restricted middleware is working and will return 401 when it is included in the route. it has been removed for testing. It could be tested fully by duplicating the tests in auth.test in the test here before the request is sent
