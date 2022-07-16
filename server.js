const { app } = require("./app");

// Models
const { User } = require("./models/user.model");
const { Restaurant } = require("./models/restaurant.model");
const { Meals } = require("./models/meals.model");
const { Order } = require("./models/order.model");
const { Review } = require("./models/review.model");

// Utils
const { db } = require("./utils/database.util");

db.authenticate()
  .then(() => console.log("Db authenticated"))
  .catch((err) => console.log(err));

// Establish model's relations

//?1 User <----> M Post
Restaurant.hasMany(Meals, { foreignKey: "restaurantId" });
Meals.belongsTo(Restaurant);

//? 1 & 1
Meals.hasOne(Order, { foreignKey: "mealId" });
Order.belongsTo(Meals);

// 1 User <----> M Comment
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User);

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User);

Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
Review.belongsTo(Restaurant);

// 1 Post <----> M Comment
/*Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post);*/

db.sync()
  .then(() => console.log("Db synced"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Express app runn!!");
});
