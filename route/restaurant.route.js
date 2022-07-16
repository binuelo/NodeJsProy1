const express = require("express");

// Controllers
const {
  createRestaurant,
  Restaurantactive,
  getResytaurantById,
  updateRestaurant,
  deleteResaaurant,
  createReview,
  updateReview,
} = require("../controller/restaurant.controller");

// Middlewares
const {
  createRestaurantValidators,
} = require("../middlewares/validators.middleware");
const {
  restaurantExists,
  reviewExist,
} = require("../middlewares/restaurant.middleware");
const { reviewIDExists } = require("../middlewares/review.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
const { Admin, userExists } = require("../middlewares/users.middleware");

const restaurantRouter = express.Router();
restaurantRouter.use(protectSession);
restaurantRouter.get("/:id", restaurantExists, getResytaurantById);
restaurantRouter.get("/", Restaurantactive);
restaurantRouter
  .post("/", createRestaurantValidators, createRestaurant)
  .post("/reviews/:restaurantId", reviewExist, createReview)
  .patch("/reviews/:id", reviewIDExists, updateReview)
  .use("/:id", restaurantExists)
  .route("/:id", protectUserAccount)
  .patch(updateRestaurant)
  .delete(Admin, deleteResaaurant);

module.exports = { restaurantRouter };
