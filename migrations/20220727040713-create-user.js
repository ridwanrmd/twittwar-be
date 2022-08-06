"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      first_name: Sequelize.STRING(20),
      last_name: Sequelize.STRING(20),
      age: Sequelize.INTEGER,
      image: Sequelize.STRING(100),
      gender: Sequelize.ENUM("Male", "Female"),
      phone: Sequelize.STRING(13),
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      isVerified: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: "0",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
