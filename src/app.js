const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/forecast");
const app = express();

//defininng the path for express config
const viewPath = path.join(__dirname, "../template/views");
const partialPath = path.join(__dirname, "../template/partials");

//Setup handlebar engine and view locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
//set up statuicdireactory to server
app.use(express.static(path.join(__dirname, "../public")));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App ",
    name: "Suraj Singh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About ME ",
    name: "Suraj Singh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    value: "This page will help to solve the query related to the website",
    name: "Suraj Singh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      foreCast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send(error);
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

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
    name: "Suraj Singh",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found",
    name: "Suraj Singh",
  });
});

app.listen(3000, () => {
  console.log("Server  is up on port 3000");
});
