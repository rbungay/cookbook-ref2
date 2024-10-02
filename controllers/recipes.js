// controllers/recipes.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Recipe = require("../models/recipe.js");
const Ingredient = require("../models/ingredient.js");

router.get("/", async (req, res) => {
  //TBU PASS RECIPES TO INDEX VIEW
  try {
    const recipes = await Recipe.find({ owner: req.session.user._id });
    res.render("recipes/index.ejs", { recipes });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  const ingredients = await Ingredient.find({});
  res.render("recipes/new.ejs", { ingredients });
});

router.post("/", async (req, res) => {
  //   const user = await User.findByID(req.session.user._id);
  try {
    const recipeData = {
      ...req.body, //spread operator for the body
      owner: req.session.user._id, // changing owner to the user id
    };
    const recipe = new Recipe(recipeData);
    await recipe.save();
    res.redirect("/recipes");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (recipe.owner.toString() == req.session.user._id) {
      res.render("recipes/show.ejs", { recipe });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (recipe.owner.toString() == req.session.user._id) {
      await Recipe.findByIdAndDelete(req.params.recipeId);
      res.redirect("/recipes");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:recipeId/edit", (req, res) => {
  res.render("recipes/edit.ejs");
});

module.exports = router;
