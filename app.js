const express = require("express");
const rateLimit = require("express-rate-limit");

// Routers
const { usersRouter } = require("./route/users.routes");
const { restaurantRouter } = require("./route/restaurant.route");
const { MealsRouter } = require("./route/meals.route");
const { OrderRouter } = require("./route/oreder.route");

// Global err controller
const { globalErrorHandler } = require("./controller/error.controller");

// Utils
const { AppError } = require("./utils/appError.util");

// Init express app
const app = express();

// Enable incoming JSON
app.use(express.json());

// Limit the number of requests that can be accepted to our server
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, // 1 hr
  message: "Number of requests have been exceeded",
});

app.use(limiter);

// Define endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/meals", MealsRouter);
app.use("/api/v1/orders", OrderRouter);

// Handle incoming unknown routes to the server
app.all("*", (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});
//app.use(globalErrorHandler);

module.exports = { app };
