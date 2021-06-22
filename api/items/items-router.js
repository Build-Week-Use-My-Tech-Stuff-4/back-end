const router = require("express").Router();
const Items = require("./items-model");

router.get("/", (req, res, next) => {
  Items.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Items.findById(req.params.id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Items.add(req.body).then((item) => {
    res.status(201).json(item);
  })
  .catch(next)
});

module.exports = router;
