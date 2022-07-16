// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const userExists = catchAsync(async (req, res, next) => {
  const { id } = req.params; //Capture ID Postman

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  req.user = user; //send query value
  next();
});

const Admin = catchAsync(async (req, res, next) => {
  // Validate credentials (Admin)
  const user = await User.findOne({
    where: {
      role: "admin",
    },
  });
  console.log(user);
  if (user.role !== "admin") {
    return next(new AppError("invalid user, you are not admin", 400));
  }

  // Send response
  req.user = user;
  next();
});

module.exports = { userExists, Admin };
