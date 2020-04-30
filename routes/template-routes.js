const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  dirname = "./uploads"

router.get("/", (req, res) => {
  fs.readdir(dirname, (err, files) => {
    res.render("template", { files: files })
  });
});



module.exports = router;