const { db, DataTypes } = require("../utils/database.util");

const Review = db.define("review", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ranting: {
    type: DataTypes.INTEGER,
  },
});
module.exports = { Review };
