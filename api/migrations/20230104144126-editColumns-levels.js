'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.changeColumn('Levels', 'level_description', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ]);
  },
  down: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.changeColumn('Levels', 'level_description', {
        allowNull: true,
        type: Sequelize.STRING
      });
      
      return Promise.resolve();
    } catch (err) {

      return Promise.reject(err);
    }
  }
};