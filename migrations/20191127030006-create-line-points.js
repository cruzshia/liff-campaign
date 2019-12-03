'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('line_points', {
      uid: {
        type: Sequelize.STRING
      },
      point: {
        type: Sequelize.INTEGER
      },
      point_url: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      week: {
        type: Sequelize.INTEGER,
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
