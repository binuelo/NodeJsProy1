const express = require("express");

// Controllers
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  getAllUsersOrder,
  getOrderById,
} = require("../controller/users.controller");

// Middlewares
const {
  createUserValidators,
} = require("../middlewares/validators.middleware");
const { userExists } = require("../middlewares/users.middleware");
const {
  protectSession,
  protectUserAccount,
} = require("../middlewares/auth.middleware");
const { OrderExists } = require("../middlewares/order.middleware");

const usersRouter = express.Router();

usersRouter.post("/signup", createUserValidators, createUser);

usersRouter.post("/login", login);

usersRouter.use(protectSession);

usersRouter.get("/", getAllUsers);
usersRouter.get("/orders", getAllUsersOrder);
usersRouter.get("/orders/:id", OrderExists, getOrderById);

usersRouter
  .use("/:id", userExists)
  .route("/:id")
  .get(getUserById)
  .patch(protectUserAccount, updateUser)
  .delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
