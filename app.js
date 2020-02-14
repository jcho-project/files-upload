const express = require("express"),
  fileUpload = require("express-fileupload"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost/he_dd", { useNewUrlParser: true, useUnifiedTopology: true })

// Schema
let deliverySchema = new mongoose.Schema({
  truck: Array,
  model: Array,
  units: Array,
  quantity: Array,
  product_grade: Array,
  cbm: Array
});

let deliveryData = mongoose.model("HE_DD", deliverySchema);

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}))

// Add other middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Get
app.get("/", (req, res) => {
  res.render(index.html);
})

// ==============================================================
// post excel
// ==============================================================

app.post("/excel", (req, res) => {
  let rawData = req.body.excel_data;
  let rows = rawData.split("\n");
  let refinedData = [];

  // Delete trailing row
  rows.pop();

  // Remove all spaces
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(/\s+/)
  }

  

  console.log(refinedData);

  res.redirect("/");

  // for (let i = 0; i < rows[0].length - 1; i++) {
  //   refinedData[rows[0][i]] = [rows[1][i]]

  //   for (let j = 2; j < rows.length; j++) {
  //     refinedData[rows[0][i]].push(rows[j][i])
  //   }
  // }

  // let newDD = {
  //   truck: refinedData.Truck,
  //   model: refinedData.Model,
  //   units: refinedData.Units,
  //   quantity: refinedData["Qty."],
  //   product_grade: refinedData.Prod_Gr,
  //   cbm: refinedData["CBM"]
  // }

  // deliveryData.create(newDD, (err, newlyCreated) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.redirect("/");
  //   }
  // })
})

// ==============================================================
// post upload
// ==============================================================

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