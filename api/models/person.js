'use strict';
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  People.associate = function(models) {
    People.hasMany(models.Classes)
    People.hasMany(models.Matriculations)
  };
  return People;
};