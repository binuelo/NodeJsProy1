// Models
const { Meals } = require("../models/meals.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params; //Capture ID Postman

  const newmeals = await Meals.create({
    name,
    price,
    restaurantId: id, //insert ID postman
  });

  res.status(201).json({
    status: "success",
    newmeals,
  });
});

const Mealactive = catchAsync(async (req, res, next) => {
  const meal = await Meals.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    meal,
  });
});
const getMealById = catchAsync(async (req, res, next) => {
  const { meals } = req;

  res.status(200).json({
    status: "success",
    meals,
  });
});

const updateMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;
  const { name, price } = req.body;

  await meals.update({ name, price });

  res.status(204).json({
    status: "success",
  });
});

const deleteMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;

  // await user.destroy();
  await meals.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createMeals,
  Mealactive,
  getMealById,
  updateMeals,
  deleteMeals,
};
