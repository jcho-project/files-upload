const express = require("express"),
  router = express.Router(),
  deliveryDataHE = require("../models/he-model"),
  xlsx = require("xlsx"),
  workbook = xlsx.readFile("./uploads/he-creator.xlsx");

// =========================================================================
// Display HE DD List & Detail Info Page
// =========================================================================

router.get("/", (req, res) => {
  deliveryDataHE.find({}, (err, allDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("he-show", { data: allDeliveryData });
    }
  }).sort({ truck: 1, quantity: -1 });
});

router.get("/:id", (req, res) => {
  deliveryDataHE.findById(req.params.id, (err, foundDeliveryData) => {
    if (err) {
      console.log(err);
    } else {
      res.render("detail-info", { data: foundDeliveryData });
    }
  })
});

// =========================================================================
// CREATE route - create a database suited data from input and save to DB
// =========================================================================

// Create route for HA
router.post("/upload", (req, res) => {
  let rawData = req.body.excel_data;
  rawData.split("\n");
  let rows = rawData.split("\n");
  rows.pop();
  let refinedData = [];
  let newDD = [];

  for (let i = 0; i < rows.length; i++) {
    rows[i] = rows[i].split("\t");
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
      ["Ordered Qty"]: refinedData[i]["Ordered Qty"],
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
    });
  }

  console.log(newDD)

  // Insert into database
  deliveryDataHE.create(newDD, (err, newlyCreated) => {
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
  deliveryDataHE.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      found.marked = !found.marked;
      found.save();
      res.redirect("/he-dd");
    }
  });
});

// Update truck route for HE
router.put("/:id/truck", (req, res) => {
  deliveryDataHE.findByIdAndUpdate(req.params.id, { Truck: req.body.truck }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        "redirect_url": "/he-dd"
      });
    }
  });
});

// Update Slot Date
router.put("/:id/slotDate", (req, res) => {
  deliveryDataHE.findByIdAndUpdate(req.params.id, { ["Slot Date"]: req.body["Slot Date"] }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.body["Slot Date"])
      res.send({
        "redirect_url": "/he-dd"
      });
    }
  });
});

// Update Slot Time
router.put("/:id/slotTime", (req, res) => {
  deliveryDataHE.findById(req.params.id, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      let newHour = parseInt(req.body["Slot Time"][0]) + 2;
      let newMinutes = parseInt(req.body["Slot Time"][1]);

      found["Slot Date"] = found["Slot Date"].setHours(newHour, newMinutes, 0);

      console.log(found["Slot Date"]);

      deliveryDataHE.updateOne({ "_id": req.params.id }, { $set: { ["Slot Date"]: found["Slot Date"] } }, (err, updated) => {
        if (err) {
          console.log(err);
        }
      });

      res.send({
        "redirect_url": "/he-dd"
      });
    }
  });
});

// Update Reservation No
router.put("/:id/reservationNo", (req, res) => {
  deliveryDataHE.findByIdAndUpdate(req.params.id, { ["Reservation No"]: req.body["Reservation No"] }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send({
        "redirect_url": "/he-dd"
      });
    }
  });
});

// Update Status
router.put("/:id/status", (req, res) => {
  deliveryDataHE.findByIdAndUpdate(req.params.id, { ["Status"]: req.body["statusDropdown"] }, (err, found) => {
    if (err) {
      console.log(err);
    } else {
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

// =========================================================================
// Document Creation Button All Docs
// =========================================================================

router.put("/alldocs", (req, res) => {
  console.log("all-docs clicked");

  // let data = xlsx.utils.sheet_to_json(workbook.Sheets["test"])

  // let first_sheet_name = workbook.SheetNames[0];
  // let address_of_cell = "A1";

  // let worksheet = workbook.Sheets[first_sheet_name];
  // let desired_cell = worksheet[address_of_cell];

  // let desired_value = (desired_cell ? desired_cell.v : undefined);

  // function wb_has_macro(wb) {
  //   if (!!wb.vbaraw) {
  //     console.log("macro available")
  //   };
  //   // const sheets = wb.SheetNames.map((n) => wb.Sheets[n]);
  //   // return sheets.some((ws) => !!ws && ws['!type'] == 'macro');
  // }

  // console.log(first_sheet_name);
  // console.log(desired_value);
  // console.log(data);
})

module.exports = router;
