// controllers/recipes.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");
const Ingredient = require("../models/ingredient.js");

router.get("/", async (req, res) => {
  res.render("recipes/index.ejs");
});

router.get("/new", async (req, res) => {
  const ingredients = await Ingredient.find({});
  res.render("recipes/new.ejs", { ingredients });
});

module.exports = router;
