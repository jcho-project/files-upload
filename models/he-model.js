const mongoose = require("mongoose");

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

module.exports = mongoose.model("he-dd", deliveryDataSchema);