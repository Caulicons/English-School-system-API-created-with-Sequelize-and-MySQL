'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date: {
        type: Sequelize.DATEONLY
      },
      teacher_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "People",
          key: "id"
        }
      },
      level_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Levels",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Classes');
  }
};