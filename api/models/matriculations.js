'use strict';
module.exports = (sequelize, DataTypes) => {
	const Matriculations = sequelize.define('Matriculations', {
		status: DataTypes.STRING
	}, {
		paranoid: true
	});
	Matriculations.associate = function (models) {
		Matriculations.belongsTo(models.People, {
			foreignKey: 'student_id'
		}),
			Matriculations.belongsTo(models.Classes, {
				foreignKey: 'class_id'
			});
	};
	return Matriculations;
};