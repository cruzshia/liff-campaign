'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('line_points', {
      uid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.INTEGER
      },
      point_url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('line_points');
  }
};
