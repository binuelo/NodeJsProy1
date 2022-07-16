const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

//middlewares
const { protectSession } = require("../middlewares/auth.middleware");
// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

//dotenv.config({ path: "./config.env" });

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  // Hash password
  //  const salt = await bcrypt.genSalt(12);

  const newRetaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({
    status: "success",
    newRetaurant,
  });
});
const getResytaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: "success",
    restaurant,
  });
});
const Restaurantactive = catchAsync(async (req, res, next) => {
  const restauran = await Restaurant.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    restauran,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({ name, address });

  res.status(204).json({
    status: "success",
  });
});

const deleteResaaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  // await user.destroy();
  await restaurant.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, ranting } = req.body;
  const { review } = req;
  const { sessionUser } = req;
  console.log("El Valor es :" + review.id + "" + sessionUser.id);
  const newReview = await Review.create({
    userId: sessionUser.id,
    comment,
    ranting,
    restaurantId: review.id,
  });

  res.status(201).json({
    status: "success",
    newReview,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { reviewI } = req;
  const { comment, ranting } = req.body;

  await reviewI.update({ comment, ranting });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createRestaurant,
  getResytaurantById,
  Restaurantactive,
  updateRestaurant,
  deleteResaaurant,
  createReview,
  updateReview,
};
