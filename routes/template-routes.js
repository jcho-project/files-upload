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

router.post("/upload-avatar", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });

    } else {

      // use the name of the input field (i.e."avatar") to retrieve the uploaded file)
      let avatar = req.files.sampleFile;

      // use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./uploads/" + avatar.name);

      // redirect to templates page
      res.redirect("/templates");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;