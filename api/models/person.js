'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('People', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Pessoas.associate = function(models) {
    // associations can be defined here
  };
  return Pessoas;
};