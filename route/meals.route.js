const express = require("express");

// Controllers
const {
  createMeals,
  Mealactive,
  getMealById,
  updateMeals,
  deleteMeals,
} = require("../controller/meals.controller");

// Middlewares

const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
const { Admin } = require("../middlewares/users.middleware");
const { mealsExists } = require("../middlewares/meals.middleware");

const MealsRouter = express.Router();
MealsRouter.use(protectSession);
MealsRouter.post("/:id", createMeals);
MealsRouter.get("/", Mealactive)
  .use("/:id", mealsExists)
  .get(getMealById)
  .route("/:id", protectUserAccount)
  .patch(Admin, updateMeals)
  .delete(Admin, deleteMeals);
module.exports = { MealsRouter };
