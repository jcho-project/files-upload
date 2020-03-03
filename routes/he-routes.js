const express = require("express"),
  router = express.Router(),
  deliveryData = require("../models/he-model");

// =========================================================================
// Display HE DD List
// =========================================================================

router.get("/", (req, res) => {
  deliveryData.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("he-show", { data: allDeliveryData });
    }
  }).sort({ truck: 1, quantity: -1 });
});

// =========================================================================
// CREATE route - create a database suited data from input and save to DB
// =========================================================================

// Create route for HE
router.post("/upload", (req, res) => {
  let rawData = req.body.excel_data;
  let rows = rawData.split("\n");
  let refinedData = [];
  let newDD = [];

  // Delete trailing row
  rows.pop();

  // Remove all spaces
  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split(/\s+/);
  }

  // MongoDB suited data parsing
  for (let j = 1; j < rows.length; j++) {
    let temp = {};

    for (let i = 0; i < rows[0].length - 1; i++) {
      temp[rows[0][i]] = rows[j][i];
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
    });
  }

  // Insert into database
  deliveryData.create(newDD, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/he-dd");
    }
  });
});

// =========================================================================
// UPDATE route - update marked status of checked line
// =========================================================================

// Update route for HE
router.put("/:id", (req, res) => {
  deliveryData.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      found.marked = !found.marked;
      found.save();
      res.redirect("/he-dd");
    }
  });
});

// =========================================================================
// DESTROY route - delete selected line from DD list
// =========================================================================

// Destroy routes for HE
router.delete("/:id", (req, res) => {
  deliveryData.deleteMany({ marked: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/he-dd");
    }
  });
});

router.delete("/", (req, res) => {
  deliveryData.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/he-dd");
    }
  });
});

module.exports = router;
