const jwt = require("jsonwebtoken");

// Models
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");
const { Meals } = require("../models/meals.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");
//middlewares
const { protectSession } = require("../middlewares/auth.middleware");

const createOrder = catchAsync(async (req, res, next) => {
  const { mealId, quantity } = req.body;
  const { sessionUser } = req;
  const [restaurant] = req;
  console.log(restaurant.id);
  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
  });

  res.status(201).json({
    status: "success",
    newOrder,
  });
});

const getOrderMe = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const id = sessionUser.id;

  const order = await Order.findAll({
    where: {
      userId: id,
    },
  });
  res.status(201).json({
    status: "success",
    order,
  });
});
//! fail Update can it´s query
const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  const { meals } = req;
  const { totalprice } = req.body;
  const TP = meals.price * order.quantity;
  console.log(meals.price);

  await order.update({
    totalprice: TP,
    status: "completed",
  });

  res.status(204).json({
    status: "success",
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  // await user.destroy();
  await order.update({ status: "Cancelled" });

  res.status(204).json({ status: "success" });
});

module.exports = {
  createOrder,
  getOrderMe,
  updateOrder,
  deleteOrder,
};
