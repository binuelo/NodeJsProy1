const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { User } = require("../models/user.model");
const { Order } = require("../models/order.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

//Middlewares
const { OrderExists } = require("../middlewares/order.middleware");

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    newUser,
  });
});
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate credentials (email)
  const user = await User.findOne({
    where: {
      email,
      status: "active",
    },
  });

  if (!user) {
    return next(new AppError("Credentials invalid", 400));
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(new AppError("Credentials invalid", 400));
  }

  // Generate JWT (JsonWebToken) ->
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Send response
  res.status(200).json({
    status: "success",
    token,
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(204).json({
    status: "success",
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  // await user.destroy();
  await user.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({
    status: "success",
    users,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    user,
  });
});
const getAllUsersOrder = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    include: [{ model: Order }],
  });
  res.status(200).json({
    status: "success",
    users,
  });
});
const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order1 = await Order.findOne({
    where: { id },
    include: [{ model: User }],
  });
  res.status(200).json({
    status: "success",
    order1,
  });
});
module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsersOrder,
  getOrderById,
};
