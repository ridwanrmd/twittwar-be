"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "user_id" });
      User.hasMany(models.Comment, { foreignKey: "user_id" });
      User.hasMany(models.Like, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER, // int
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      first_name: DataTypes.STRING(20),
      last_name: DataTypes.STRING(20),
      age: DataTypes.INTEGER,
      image: DataTypes.STRING(100),
      gender: DataTypes.ENUM("Male", "Female"),
      phone: DataTypes.STRING(13),
      bio: DataTypes.STRING(200),
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      token: DataTypes.STRING(200),
      isVerified: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
