'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculation = sequelize.define('Matriculation', {
    status: DataTypes.STRING
  }, {});
  Matriculation.associate = function(models) {
    // associations can be defined here
  };
  return Matriculation;
};