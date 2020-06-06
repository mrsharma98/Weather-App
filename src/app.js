const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
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
