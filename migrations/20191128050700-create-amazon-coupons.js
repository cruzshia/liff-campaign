'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('amazon_coupons', {
      uid: {
        allowNull: false,
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
    return queryInterface.dropTable('amazon_coupons');
  }
};
