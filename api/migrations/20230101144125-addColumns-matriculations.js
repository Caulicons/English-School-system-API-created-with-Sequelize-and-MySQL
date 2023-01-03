'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Matriculations', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('Matriculations', 'deletedAt');
  }
};