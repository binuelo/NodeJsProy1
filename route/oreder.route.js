const express = require("express");

// Controllers
const {
  createOrder,
  getOrderMe,
  deleteOrder,
  updateOrder,
} = require("../controller/order.controller");

// Middlewares
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const { OrderExists } = require("../middlewares/order.middleware");
const { mealsExists } = require("../middlewares/meals.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
const { Admin, userExists } = require("../middlewares/users.middleware");

const OrderRouter = express.Router();
OrderRouter.use(protectSession);
OrderRouter.get("/me", getOrderMe);
//OrderRouter.get("/", Restaurantactive);
OrderRouter.post("/", createOrder)
  .use("/:id", OrderExists)
  .route("/:id", protectUserAccount)
  .patch(updateOrder)
  .delete(Admin, deleteOrder);

module.exports = { OrderRouter };
