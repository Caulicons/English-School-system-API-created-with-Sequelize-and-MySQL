'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    start_date: DataTypes.DATEONLY
  }, {});
  Class.associate = function(models) {
    // associations can be defined here
  };
  return Class;
};