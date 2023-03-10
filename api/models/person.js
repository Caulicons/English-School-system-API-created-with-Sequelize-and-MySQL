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
  People.associate = function (models) {
    People.hasMany(models.Classes, {
      foreignKey: 'teacher_id'
    })
    People.hasMany(models.Matriculations, {
      foreignKey: 'student_id'
    })
  };
  return People;
};