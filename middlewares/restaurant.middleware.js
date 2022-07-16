// Models
const { Restaurant } = require("../models/restaurant.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const restaurantExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError("restaurant not found", 404));
  }

  req.restaurant = restaurant;
  next();
});

const reviewExist = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const review = await Restaurant.findOne({ where: { id: restaurantId } });

  if (!review) {
    return next(new AppError("review not found", 404));
  }

  req.review = review;
  next();
});

module.exports = { restaurantExists, reviewExist };
