const db = require("../../data/db-config");
const request = require("supertest");
const server = require('../server')
const Users = require('./users-model')

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

//Model tests
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



//Server tests