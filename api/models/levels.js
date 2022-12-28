'use strict';
module.exports = (sequelize, DataTypes) => {
  const Levels = sequelize.define('Levels', {
    level_description: DataTypes.STRING
  }, {});
  Levels.associate = function (models) {
    Levels.hasMany(models.Classes, {
      foreignKey: 'level_id'
    })
  };
  return Levels;
};