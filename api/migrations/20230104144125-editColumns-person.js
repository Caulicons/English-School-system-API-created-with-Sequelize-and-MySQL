'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.changeColumn('People', 'name', {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('People', 'active', {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }),
      queryInterface.changeColumn('People', 'role', {
        allowNull: false,
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('People', 'email', {
        allowNull: false,
        type: Sequelize.STRING
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {

    try {
      await queryInterface.changeColumn('People', 'name', {
        allowNull: true,
        type: Sequelize.STRING
      });
      await queryInterface.changeColumn('People', 'active', {
        allowNull: true,
        type: Sequelize.BOOLEAN
      });
      await queryInterface.changeColumn('People', 'role', {
        allowNull: true,
        type: Sequelize.STRING
      });
      await queryInterface.changeColumn('People', 'email', {
        allowNull: true,
        type: Sequelize.STRING
      });

      return Promise.resolve();
    } catch (err) {

      return Promise.reject(err);
    }
  }
};