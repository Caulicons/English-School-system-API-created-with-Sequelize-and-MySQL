'use strict';
module.exports = (sequelize, DataTypes) => {
	const Classes = sequelize.define('Classes', {
		start_date: DataTypes.DATEONLY
	}, {
		paranoid: true
	});
	Classes.associate = function (models) {
		Classes.hasMany(models.Matriculations, {
			foreignKey: 'class_id',
			scope: {
				status: 'confirmed'
			},
			as: 'classeMatriculations'
		});
		Classes.belongsTo(models.People, {
			foreignKey: 'teacher_id'
		});
		Classes.belongsTo(models.Levels, {
			foreignKey: 'level_id'
		});
	};
	return Classes;
};