// Models
const { Review } = require("../models/review.model");

// Utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const reviewIDExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const reviewI = await Review.findOne({ where: { id } });

  if (!reviewI) {
    return next(new AppError("Review not found", 404));
  }
  req.reviewI = reviewI;
  next();
});

module.exports = { reviewIDExists };
