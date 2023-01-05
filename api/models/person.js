'use strict';
module.exports = (sequelize, DataTypes) => {
	const People = sequelize.define('People', {
		name: {
			type: DataTypes.STRING,
			validate: {
				length: (data) => {
					if (data.length < 4) throw new Error('name field must be at least 3 characters');
				}
			}
		},
		active: DataTypes.BOOLEAN,
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: {
					args: true,
					msg: 'The text is not in the format email'
				}
			}
		},
		role: {
			type: DataTypes.STRING,
			validate: {
				isIn: {
					args: ['estudante', 'docente'],
					msg: 'The can only be "estudante" or "docente"'
				}
			}
		}
	}, {
		scopes: {
			justActive:  {
				where: {
					active: true
				}
			}
		},
		paranoid: true
	});
	People.associate = function (models) {
		People.hasMany(models.Classes, {
			foreignKey: 'teacher_id',
			as: 'monitoredClasses'
		});
		People.hasMany(models.Matriculations, {
			foreignKey: 'student_id',
			scope: {
				status: 'confirmed'
			},
			as: 'confirmedMatriculations'
		});
	};
	return People;
};