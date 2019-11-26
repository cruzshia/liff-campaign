'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('estimation_logs', {
      uid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('requested', 'pending', 'estimated', 'completed'),
        defaultValue: 'requested'
      },
      waist_circumference: {
        type: Sequelize.FLOAT,
      },
      offal_fat: {
        type: Sequelize.FLOAT,
      },
      wc_diff: {
        type: Sequelize.FLOAT,
      },
      of_diff: {
        type: Sequelize.FLOAT,
      },
      week: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('estimation_logs');
  }
};