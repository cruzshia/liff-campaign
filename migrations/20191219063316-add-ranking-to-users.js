'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'users',
          'bodygram_id',
          {
            type: Sequelize.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'users',
          'rank',
          {
            type: Sequelize.INTEGER,
          },
          { transaction: t }
        ),
        queryInterface.addIndex(
          'users',
          ['bodygram_id'],
          {
            indexName: 'users_bodygram_id_index'
          },
          { transaction: t }
        ),
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('users', ['bodygram_id'], { transaction: t }),
        queryInterface.removeColumn('users', 'bodygram_id', { transaction: t }),
        queryInterface.removeColumn('users', 'rank', { transaction: t }),
      ])
    })
  }
};
