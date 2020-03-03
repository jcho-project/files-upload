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

mongoose.connect("mongodb://localhost/dd-dashboard", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// =========================================================================
// deliveryData Model & Schema
// =========================================================================

let deliveryDataSchemaHA = new mongoose.Schema({
  ["Truck"]: String,
  ["Bill To Name"]: String,
  ["Ship To Name"]: String,
  ["Model"]: String,
  ["Order No"]: String,
  ["Line No"]: String,
  ["Order Type"]: String,
  ["Line Status"]: String,
  ["Hold Flag"]: String,
  ["Ready To Pick"]: String,
  ["Pick Released"]: String,
  ["Instock Flag"]: String,
  ["Order Qty"]: String,
  ["Unit Selling Price"]: String,
  ["Sales Amount"]: String,
  ["Tax Amount"]: String,
  ["Charge Amount"]: String,
  ["Line Total"]: String,
  ["List Price"]: String,
  ["Original List Price"]: String,
  ["DC Rate"]: String,
  ["Currency"]: String,
  ["DFI Applicable"]: String,
  ["AAI Applicable"]: String,
  ["Cancel Qty"]: String,
  ["Booked Date"]: String,
  ["Req Arrival Date From"]: String,
  ["Req Arrival Date To"]: String,
  ["Req Ship Date"]: String,
  ["Line Type"]: String,
  ["Customer Name"]: String,
  ["Bill To"]: String,
  ["Department"]: String,
  ["Ship To"]: String,
  ["Ship To Full Name"]: String,
  ["Store No"]: String,
  ["Price Condition"]: String,
  ["Payment Term"]: String,
  ["Customer PO No"]: String,
  ["Customer Po Date"]: String,
  ["Sales Person"]: String,
  ["Inventory Org"]: String,
  ["Sub- Inventory"]: String,
  ["Shipping Method"]: String,
  ["Order Source"]: String,
  ["Order Status"]: String,
  ["Order Category"]: String,
  ["Receiver City Desc"]: String,
  ["Receiver Postal code"]: String,
  ["Receiver State"]: String,
  ["Item Division"]: String,
  ["Product Level1 Name"]: String,
  ["Product Level2 Name"]: String,
  ["Product Level3 Name"]: String,
  ["Product Level4 Name"]: String,
  ["Product Level4 Code"]: String,
  ["Model Category"]: String,
  ["Item Type"]: String,
  ["Item Weight"]: String,
  ["Item CBM"]: String,
  ["Sales Channel (High)"]: String,
  ["Sales Channel (Low)"]: String,
  ["Back Order Hold"]: String,
  ["Credit Hold"]: String,
  ["Overdue Hold"]: String,
  ["Customer Hold"]: String,
  ["Payterm Term Hold"]: String,
  ["FP Hold"]: String,
  ["Minimum Hold"]: String,
  ["Future Hold"]: String,
  ["Reserve Hold"]: String,
  ["Manual Hold"]: String,
  ["Auto Pending Hold"]: String,
  ["S/A Hold"]: String,
  ["Form Hold"]: String,
  ["Bank Collateral Hold"]: String,
  ["Insurance Hold"]: String,
  ["Inventory Reserved"]: String,
  ["Pick Release Qty"]: String,
  ["SO-SA Mapping"]: String,
  ["Picking Remark"]: String,
  ["Shipping Remark"]: String,
  ["Create Employee Name"]: String,
  ["Create Date"]: String,
  ["Order Date"]: String,
  ["Customer RAD"]: String,
  ["Accounting Unit"]: String,
  ["Customer Model"]: String,
  ["CNPJ"]: String,
  ["SO Status(2)"]: String,
  ["SBP Tax Include"]: String,
  ["SBP Tax Exclude"]: String,
  ["RRP Tax Include"]: String,
  ["RRP Tax Exclude"]: String,
  ["SO FAP Flag"]: String,
  marked: Boolean,
  ["Slot Date"]: Date,
  ["Slot Time"]: Date,
  ["Reservation No"]: String,
  ["Status"]: String
});

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
let deliveryDataHA = mongoose.model("ha-dd", deliveryDataSchemaHA);

// =========================================================================
// INDEX route - show all DD's
// =========================================================================

app.get("/", (req, res) => {
  res.render("index");
})

// Display HE DD List
app.get("/he-dd", (req, res) => {
  deliveryData.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("he-show", { data: allDeliveryData })
    }
  }).sort({ truck: 1, quantity: -1 })
})

// Display HA DD List
app.get("/ha-dd", (req, res) => {
  deliveryDataHA.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("ha-show", { data: allDeliveryData })
    }
  }).sort({ truck: 1, quantity: -1 })
})

// =========================================================================
// CREATE route - create a database suited data from input and save to DB
// =========================================================================

// Create route for HE
app.post("/he-upload", (req, res) => {
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
      res.redirect("/he-show");
    }
  })
})

// Create route for HA
app.post("/ha-upload", (req, res) => {
  let rawData = req.body.excel_data;
  rawData.split("\n")
  let rows = rawData.split("\n");
  rows.pop()
  let refinedData = [];
  let newDD = [];

  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split("\t");
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
      ["Truck"]: "",
      ["Bill To Name"]: refinedData[i]["Bill To Name"],
      ["Ship To Name"]: refinedData[i]["Ship To Name"],
      ["Model"]: refinedData[i]["Model"],
      ["Order No"]: refinedData[i]["Order No"],
      ["Line No"]: refinedData[i]["Line No"],
      ["Order Type"]: refinedData[i]["Order Type"],
      ["Line Status"]: refinedData[i]["Line Status"],
      ["Hold Flag"]: refinedData[i]["Hold Flag"],
      ["Ready To Pick"]: refinedData[i]["Ready To Pick"],
      ["Pick Released"]: refinedData[i]["Pick Released"],
      ["Instock Flag"]: refinedData[i]["Instock Flag"],
      ["Order Qty"]: refinedData[i]["Order Qty"],
      ["Unit Selling Price"]: refinedData[i]["Unit Selling Price"],
      ["Sales Amount"]: refinedData[i]["Sales Amount"],
      ["Tax Amount"]: refinedData[i]["Tax Amount"],
      ["Charge Amount"]: refinedData[i]["Charge Amount"],
      ["Line Total"]: refinedData[i]["Line Total"],
      ["List Price"]: refinedData[i]["List Price"],
      ["Original List Price"]: refinedData[i]["Original List Price"],
      ["DC Rate"]: refinedData[i]["DC Rate"],
      ["DFI Applicable"]: refinedData[i]["DFI Applicable"],
      ["Currency"]: refinedData[i]["Currency"],
      ["AAI Applicable"]: refinedData[i]["AAI Applicable"],
      ["Cancel Qty"]: refinedData[i]["Cancel Qty"],
      ["Booked Date"]: refinedData[i]["Booked Date"],
      ["Req Arrival Date From"]: refinedData[i]["Req Arrival Date From"],
      ["Req Arrival Date To"]: refinedData[i]["Req Arrival Date To"],
      ["Req Ship Date"]: refinedData[i]["Req Ship Date"],
      ["Line Type"]: refinedData[i]["Line Type"],
      ["Customer Name"]: refinedData[i]["Customer Name"],
      ["Bill To"]: refinedData[i]["Bill To"],
      ["Department"]: refinedData[i]["Department"],
      ["Ship To"]: refinedData[i]["Ship To"],
      ["Ship To Full Name"]: refinedData[i]["Ship To Full Name"],
      ["Store No"]: refinedData[i]["Store No"],
      ["Price Condition"]: refinedData[i]["Price Condition"],
      ["Payment Term"]: refinedData[i]["Payment Term"],
      ["Customer PO No"]: refinedData[i]["Customer PO No."],
      ["Customer Po Date"]: refinedData[i]["Customer Po Date"],
      ["Sales Person"]: refinedData[i]["Sales Person"],
      ["Inventory Org"]: refinedData[i]["Inventory Org"],
      ["Sub- Inventory"]: refinedData[i]["Sub- Inventory"],
      ["Shipping Method"]: refinedData[i]["Shipping Method"],
      ["Order Source"]: refinedData[i]["Order Source"],
      ["Order Status"]: refinedData[i]["Order Status"],
      ["Order Category"]: refinedData[i]["Order Category"],
      ["Receiver City Desc"]: refinedData[i]["Receiver City Desc"],
      ["Receiver Postal code"]: refinedData[i]["Receiver Postal code"],
      ["Receiver State"]: refinedData[i]["Receiver State"],
      ["Item Division"]: refinedData[i]["Item Division"],
      ["Product Level1 Name"]: refinedData[i]["Product Level1 Name"],
      ["Product Level2 Name"]: refinedData[i]["Product Level2 Name"],
      ["Product Level3 Name"]: refinedData[i]["Product Level3 Name"],
      ["Product Level4 Name"]: refinedData[i]["Product Level4 Name"],
      ["Product Level4 Code"]: refinedData[i]["Product Level4 Code"],
      ["Model Category"]: refinedData[i]["Model Category"],
      ["Item Type"]: refinedData[i]["Item Type"],
      ["Item Weight"]: refinedData[i]["Item Weight"],
      ["Item CBM"]: refinedData[i]["Item CBM"],
      ["Sales Channel (High)"]: refinedData[i]["Sales Channel (High)"],
      ["Sales Channel (Low)"]: refinedData[i]["Sales Channel (Low)"],
      ["Back Order Hold"]: refinedData[i]["Back Order Hold"],
      ["Credit Hold"]: refinedData[i]["Credit Hold"],
      ["Overdue Hold"]: refinedData[i]["Overdue Hold"],
      ["Customer Hold"]: refinedData[i]["Customer Hold"],
      ["Payterm Term Hold"]: refinedData[i]["Payterm Term Hold"],
      ["FP Hold"]: refinedData[i]["FP Hold"],
      ["Minimum Hold"]: refinedData[i]["Minimum Hold"],
      ["Future Hold"]: refinedData[i]["Future Hold"],
      ["Reserve Hold"]: refinedData[i]["Reserve Hold"],
      ["Manual Hold"]: refinedData[i]["Manual Hold"],
      ["Auto Pending Hold"]: refinedData[i]["Auto Pending Hold"],
      ["S/A Hold"]: refinedData[i]["S/A Hold"],
      ["Form Hold"]: refinedData[i]["Form Hold"],
      ["Bank Collateral Hold"]: refinedData[i]["Bank Collateral Hold"],
      ["Insurance Hold"]: refinedData[i]["Insurance Hold"],
      ["Inventory Reserved"]: refinedData[i]["Inventory Reserved"],
      ["Pick Release Qty"]: refinedData[i]["Pick Release Qty"],
      ["SO-SA Mapping"]: refinedData[i]["SO-SA Mapping"],
      ["Picking Remark"]: refinedData[i]["Picking Remark"],
      ["Shipping Remark"]: refinedData[i]["Shipping Remark"],
      ["Create Employee Name"]: refinedData[i]["Create Employee Name"],
      ["Create Date"]: refinedData[i]["Create Date"],
      ["Order Date"]: refinedData[i]["Order Date"],
      ["Customer RAD"]: refinedData[i]["Customer RAD"],
      ["Accounting Unit"]: refinedData[i]["Accounting Unit"],
      ["Customer Model"]: refinedData[i]["Customer Model"],
      ["CNPJ"]: refinedData[i]["CNPJ"],
      ["SO Status(2)"]: refinedData[i]["SO Status(2)"],
      ["SBP Tax Include"]: refinedData[i]["SBP Tax Include"],
      ["SBP Tax Exclude"]: refinedData[i]["SBP Tax Exclude"],
      ["RRP Tax Include"]: refinedData[i]["RRP Tax Include"],
      ["RRP Tax Exclude"]: refinedData[i]["RRP Tax Exclude"],
      ["SO FAP Flag"]: refinedData[i]["SO FAP Flag"],
      marked: false,
      ["Slot Date"]: "",
      ["Slot Time"]: "",
      ["Reservation No"]: "",
      ["Status"]: ""
    })
  }

  // Insert into database
  deliveryDataHA.create(newDD, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated)
      res.redirect("/ha-dd");
    }
  })
})

// =========================================================================
// UPDATE route - update marked status of checked line
// =========================================================================

// Update route for HE
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

// Update route for HA
app.put("/ha-dd/:id", (req, res) => {
  deliveryDataHA.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      found.marked = !found.marked;
      found.save()
      res.redirect("/ha-dd")
    }
  })
})

// Update truck route for HA
app.put("/ha-dd/:id/truck", (req, res) => {
  deliveryDataHA.findByIdAndUpdate(req.params.id, { Truck: req.body.truck }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/ha-dd")
    }
  })
})

// =========================================================================
// DESTROY route - delete selected line from DD list
// ========================================================================

// Destroy routes for HE
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

// Destroy routes for HA
app.delete("/ha-dd/:id", (req, res) => {
  deliveryDataHA.deleteMany({ marked: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/ha-dd");
    }
  })
});

app.delete("/ha-dd", (req, res) => {
  deliveryDataHA.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/ha-dd");
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
});