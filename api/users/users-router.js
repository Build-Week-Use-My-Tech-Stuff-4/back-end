const router = require("express").Router();
const Users = require('./users-model')

router.get("/", (req,res,next)=>{
     Users.findAll().then(users => {
         res.status(200).json(users)
     })
     .catch(next)
    
})
router.get("/:user_id", (req, res, next) => { // done for you
    Users.findById(req.params.user_id)
      .then(user => {
        res.json(user);
      })
      .catch(next);
  });

module.exports = router;
