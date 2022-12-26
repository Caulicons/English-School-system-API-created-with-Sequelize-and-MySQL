'use strict';
module.exports = (sequelize, DataTypes) => {
  const Matriculations = sequelize.define('Matriculations', {
    status: DataTypes.STRING
  }, {});
  Matriculations.associate = function (models) {
    Matriculations.belongsTo(models.People)
    Matriculations.belongsTo(models.Classes)
  };
  return Matriculations;
};