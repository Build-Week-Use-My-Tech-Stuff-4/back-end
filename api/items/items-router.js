const router = require("express").Router();
const Items = require("./items-model");
const { restricted } = require("../auth/auth-middleware");

router.get("/", (req, res, next) => {
  Items.findAll()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(next);
});

router.get("/:id",  (req, res, next) => {
  Items.findById(req.params.id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch(next);
});

router.post("/", restricted, (req, res, next) => {
  console.log("body", req.body);

  Items.add(req.body)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch(next);
});
router.patch("/:id", restricted, (req, res, next) => {
  const { id } = req.params;
  const changes = req.body;

  Items.modify(id, changes)
    .then((item) => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: "Unable to find that item." });
      }
    })
    .catch(next);
});
router.delete("/:id", restricted, (req, res, next) => {
  Items.remove(req.params.id)
    .then((item) => {
      if (item > 0) {
        res.status(200).json({ message: "The item has been deleted." });
      } else {
        res.status(404).json({ message: "The item could not be found." });
      }
    })
    .catch(next);
});

module.exports = router;
