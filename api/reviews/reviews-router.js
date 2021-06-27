const router = require("express").Router();
const Reviews = require("./reviews-model");
const { restricted } = require("../auth/auth-middleware");

router.get("/",  (req, res, next) => {
  Reviews.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch(next);
});
router.get("/:id",  (req, res, next) => {
  Reviews.findById(req.params.id)
    .then((review) => {
      res.status(200).json(review);
    })
    .catch(next);
});

router.post("/", restricted, (req, res, next) => {
  Reviews.add(req.body)
    .then((review) => {
      res.status(201).json(review);
    })
    .catch(next);
});
router.patch('/:id', restricted, (req,res,next)=>{
  const {id}=req.params
  const changes = req.body
  
  Reviews.modify(id,changes)
  .then(review=>{
    if(review){
      res.status(200).json(review)
    }else{
    res.status(404).json({message: "Unable to find that review."})
  }
  }) .catch(next)
  })
router.delete("/:id", restricted, (req, res, next) => {
  Reviews.remove(req.params.id)
    .then((review) => {
      if (review > 0) {
        res.status(200).json({ message: "The review has been deleted." });
      } else {
        res.status(404).jkson({ message: "The review could not be found." });
      }
    })
    .catch(next);
});

module.exports = router;
