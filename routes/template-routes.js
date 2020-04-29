const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.render("template")
});

module.exports = router;