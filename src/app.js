// ****************************
// Styling the Application
// ****************************

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Setup static directory to serve
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

// Customizing views
const viewsPath = path.join(__dirname, "../templates/views");
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);
//

app.set("view engine", "hbs");

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manish",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    heading: "About Page",
    name: "Manish",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    heading: "Help Page",
    message: "Hey, How may I help You? ",
    name: "Manish",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is raining",
    location: "Mumbai",
  });
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Manish",
    msg: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Manish",
    msg: "My 404 page.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
