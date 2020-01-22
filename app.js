const express = require("express"),
  fileUpload = require("express-fileupload"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}))

// add other middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// get
app.get("/", function (req, res) {
  res.render(index.html);
})

// post to upload
app.post("/upload-avatar", async (req, res) => {
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

      // send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port : ${port}`);
})