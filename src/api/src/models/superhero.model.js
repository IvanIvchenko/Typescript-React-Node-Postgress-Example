const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Superhero = sequelize.define("superhero", {
    nickname: {
      type: Sequelize.STRING,
    },
    real_name: {
      type: Sequelize.STRING
    },
    origin_description: {
      type: Sequelize.STRING,
    },
    superpowers: {
      type: Sequelize.STRING
    },
    catch_phrase: {
      type: Sequelize.STRING
    },
    mainImage: {
      type: Sequelize.STRING
    },
    images: {
      type: Sequelize.ARRAY(DataTypes.STRING)
    }
  });
  return Superhero;
};