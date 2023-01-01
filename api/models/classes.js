'use strict';
module.exports = (sequelize, DataTypes) => {
	const Classes = sequelize.define('Classes', {
		start_date: DataTypes.DATEONLY
	}, {});
	Classes.associate = function(models) {
		Classes.belongsTo(models.People, {
			foreignKey: 'teacher_id'
		});
		Classes.belongsTo(models.Levels, {
			foreignKey: 'level_id'
		});
	};
	return Classes;
};