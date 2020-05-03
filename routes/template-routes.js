const express = require("express"),
  router = express.Router(),
  fs = require("fs"),
  dirname = "./uploads"

router.get("/", (req, res) => {
  fs.readdir(dirname, (err, files) => {
    res.render("template", { files: files })
  });
});

// =========================================================================
// UPLOAD route - upload document template for further processing
// =========================================================================

// HE creator
router.post("/he-creator", async (req, res) => {
  if (!req.files) {
    res.redirect("/templates");
  } else {
    // use the name of the input field (i.e."avatar") to retrieve the uploaded file)
    let avatar = req.files.sampleFile;

    // use the mv() method to place the file in upload directory (i.e. "uploads")
    avatar.mv("./uploads/he-creator.xlsx");

    // redirect to templates page
    res.redirect("/templates");
  }
});

// HA creator
router.post("/ha-creator", async (req, res) => {
  if (!req.files) {
    res.redirect("/templates");
  } else {
    // use the name of the input field (i.e."avatar") to retrieve the uploaded file)
    let avatar = req.files.sampleFile;

    // use the mv() method to place the file in upload directory (i.e. "uploads")
    avatar.mv("./uploads/ha-creator.xlsx");

    // redirect to templates page
    res.redirect("/templates");
  }
});

module.exports = router;