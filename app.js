const express = require("express"),
  fileUpload = require("express-fileupload"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

const app = express();

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}))

// Add other middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/dd-dashboard", { useNewUrlParser: true, useUnifiedTopology: true })

// =========================================================================
// deliveryData Model & Schema
// =========================================================================

let deliveryDataSchema = new mongoose.Schema({
  truck: String,
  model: String,
  units: String,
  quantity: String,
  product_grade: String,
  cbm: String,
  marked: Boolean
});

let deliveryData = mongoose.model("he-dd", deliveryDataSchema);

// =========================================================================
// INDEX route - show all DD's
// =========================================================================

app.get("/", (req, res) => {
  res.render("index");
})

// Display DD List
app.get("/he-dd", (req, res) => {
  deliveryData.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { data: allDeliveryData })
    }
  }).sort({ truck: 1, quantity: -1 })
})

// =========================================================================
// CREATE route - create a database suited data from input and save to DB
// =========================================================================

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
      cbm: refinedData[i]["CBM"],
      marked: false
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

// =========================================================================
// UPDATE route - update marked status of checked line
// =========================================================================

app.put("/he-dd/:id", (req, res) => {
  deliveryData.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      found.marked = !found.marked;
      found.save()
      res.redirect("/he-dd")
    }
  })
})

// =========================================================================
// DESTROY route - delete selected line from DD list
// ========================================================================

app.delete("/he-dd/:id", (req, res) => {
  deliveryData.deleteMany({ marked: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/he-dd");
    }
  })
});

app.delete("/he-dd", (req, res) => {
  deliveryData.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/he-dd");
    }
  })
})

// =========================================================================
// UPLOAD route - upload document template for further processing
// =========================================================================

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