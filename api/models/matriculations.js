'use strict';
module.exports = (sequelize, DataTypes) => {
	const Matriculations = sequelize.define('Matriculations', {
		status: {
			type: DataTypes.STRING,
			validate: {
				isIn: {
					args: ['confirmed', 'canceled'],
					msg: 'The can only be "confirmed" or "canceled"'
				}
			}
		}
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