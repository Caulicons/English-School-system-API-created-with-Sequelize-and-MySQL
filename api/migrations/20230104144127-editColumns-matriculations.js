'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.changeColumn('Matriculations', 'status', {
        allowNull: false,
        type: Sequelize.STRING
      })
    ]);
  },
  down: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.changeColumn('Matriculations', 'status', {
        allowNull: true,
        type: Sequelize.STRING
      });
      
      return Promise.resolve();
    } catch (err) {

      return Promise.reject(err);
    }
  }
};