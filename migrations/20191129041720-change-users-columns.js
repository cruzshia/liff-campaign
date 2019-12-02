'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'is_entry_contest',
          {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          { transaction: t }
        ),
        queryInterface.removeColumn('users', 'wc_graph_url', { transaction: t }),
        queryInterface.removeColumn('users', 'of_graph_url', { transaction: t }),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'is_entry_contest', { transaction: t }),
        queryInterface.addColumn(
          'users',
          'wc_graph_url',
          Sequelize.STRING,
          { transaction: t }
        ),
        queryInterface.addColumn(
          'users',
          'of_graph_url',
          Sequelize.STRING,
          { transaction: t }
        ),
      ])
    })
  }
};