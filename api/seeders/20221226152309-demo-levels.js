module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert('Levels', [
			{
				level_description: 'basic',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				level_description: 'intermediary',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				level_description: 'advanced',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
		], {});
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Levels', null, {});
	}
};
