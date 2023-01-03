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
					msg: 'the text is not in the format email'
				}
			}
		},
		role: DataTypes.STRING
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
			foreignKey: 'teacher_id'
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