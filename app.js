const express = require("express"),
  fileUpload = require("express-fileupload"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}))

// Add other middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

mongoose.connect("mongodb://localhost/he_dd", { useNewUrlParser: true, useUnifiedTopology: true })

// Schema
let deliverySchema = new mongoose.Schema({
  truck: String,
  model: String,
  units: String,
  quantity: String,
  product_grade: String,
  cbm: String
});

let deliveryData = mongoose.model("HE_DD", deliverySchema);

// Index
app.get("/", (req, res) => {
  res.render("index");
})

// Display DD List
app.get("/show", (req, res) => {
  deliveryData.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { data: allDeliveryData })
    }
  }).sort({ truck: 1, quantity: -1 })
})

// Delete Line
app.delete("/show/:id", (req, res) => {
  deliveryData.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.redirect("/show");
    } else {
      res.redirect("/show");
    }
  })
})

// ==============================================================
// Post excel
// ==============================================================

app.post("/excel", (req, res) => {
  let rawData = req.body.excel_data;
  let rows = rawData.split("\n");
  let refinedData = [];
  let newDD = [];

  // Delete trailing row
  rows.pop();

  // Remove all spaces
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(/\s+/)
  }

  // MongoDB suited data parsing
  for (let j = 1; j < rows.length; j++) {
    let temp = {};

    for (let i = 0; i < rows[0].length - 1; i++) {
      temp[rows[0][i]] = rows[j][i]
    }

    refinedData.push(temp);
  }

  // Create array containing all refinedData rows
  for (let i = 0; i < rows.length - 1; i++) {
    newDD.push({
      truck: refinedData[i].Truck,
      model: refinedData[i].Model,
      units: refinedData[i].Units,
      quantity: refinedData[i]["Qty."],
      product_grade: refinedData[i].Prod_Gr,
      cbm: refinedData[i]["CBM"]
    })
  }

  // Insert into database
  deliveryData.create(newDD, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
})

// ==============================================================
// Post upload
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