const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("request", {
    state: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.STRING,
    },
    hours: {
      type: DataTypes.STRING,
    },
  });
};
