"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "user_id" });
      Post.hasMany(models.Comment, { foreignKey: "post_id" });
      Post.hasMany(models.Like, { foreignKey: "post_id" });
    }
  }
  Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      caption: {
        type: DataTypes.STRING(200),
      },
      post_image: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};
