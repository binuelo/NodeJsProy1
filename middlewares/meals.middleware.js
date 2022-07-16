// Models
const { Meals } = require("../models/meals.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const mealsExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meals = await Meals.findOne({ where: { id } });

  if (!meals) {
    return next(new AppError("Meals not found", 404));
  }

  req.meals = meals;
  next();
});

module.exports = { mealsExists };
