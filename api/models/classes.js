'use strict';
module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define('Classes', {
    start_date: DataTypes.DATEONLY
  }, {});
  Classes.associate = function(models) {
    Classes.hasMany(models.Matriculations)
    Classes.belongsTo(models.People)
    Classes.belongsTo(models.Levels)
  };
  return Classes;
};