const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("notifications", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
