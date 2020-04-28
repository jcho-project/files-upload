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
app.use(express.static(__dirname + "/uploads"));
app.use(methodOverride("_method"));

// Require routes
const indexRoutes = require("./routes/index"),
  haRoutes = require("./routes/ha-routes"),
  heRoutes = require("./routes/he-routes"),
  templateRoutes = require("./routes/template-routes");

app.use("/", indexRoutes);
app.use("/ha-dd", haRoutes);
app.use("/he-dd", heRoutes);
app.use("/templates", templateRoutes);

mongoose.connect("mongodb://localhost/dd-dashboard", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port : ${port}`);
});