const router = require("express").Router();
const Reviews = require("./reviews-model");

router.get("/", (req, res, next) => {
  Reviews.findAll()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch(next);
});
router.get("/:id", (req, res, next) => {
  Reviews.findById(req.params.id)
    .then((review) => {
      res.status(200).json(review);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Reviews.add(req.body)
    .then((review) => {
      res.status(201).json(review);
    })
    .catch(next);
});

router.delete("/:id", (req, res, next) => {
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
