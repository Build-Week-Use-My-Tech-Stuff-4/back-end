const router = require("express").Router();
const Users = require("./users-model");

let users = []


router.get("/", (req, res, next) => {
  //  Users.findAll().then(users => {
  //      res.status(200).json(users)
  //  })
  //  .catch(next)
  res.status(200).json([
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
router.get("/:id", (req, res, next) => {
  // done for you
  // Users.findById(req.params.user_id)
  //   .then(user => {
  //     res.json(user);
  //   })
  //   .catch(next);
  
  const { id } = req.params;
  res.status(200).json(`${id}`);
});

router.post('/',(req,res,next)=>{
  const user = req.body
  users.push(user)
  res.status(201).json('success')
})
router.delete('/:id', (req, res, next)=>{
  const {id}= req.params;
  
})

module.exports = router;
