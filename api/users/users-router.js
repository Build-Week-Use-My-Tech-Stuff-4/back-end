const router = require("express").Router();
const Users = require("./users-model");
const {restricted} = require("../auth/auth-middleware")

router.get("/",  (req, res, next) => {
   Users.findAll().then(users => {
       res.status(200).json(users)
   })
   .catch(next)
  }) 
router.get("/:id", (req, res, next) => {
  Users.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(next);
})

//this is redundant since the auth router handles adding users. I've left it in for dev use only. Really, I should have auth middleware to check if a user is an admin and restrict routes based on that. May add later as a stretch.
router.post('/', restricted, (req,res,next)=>{
Users.add(req.body)
.then(user =>{
  res.status(201).json(user)
})
.catch(next)
})

router.patch('/:id', restricted, (req,res,next)=>{
const {id}=req.params
const changes = req.body

Users.modify(id,changes)
.then(user=>{
  if(user){
    res.status(200).json(user)
  }else{
  res.status(404).json({message: "Unable to find that user."})
}
}) .catch(next)
})

router.delete('/:id', restricted, (req, res, next)=>{
  Users.remove(req.params.id)
  .then(user =>{
    if(user >0){
      res.status(200).json({message: "The user has been deleted."})
    } else {
      res.status(404).jkson({message: "The user could not be found."})
    }
  })
  .catch(next)
  
})

module.exports = router;
