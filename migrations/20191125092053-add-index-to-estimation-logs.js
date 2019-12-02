'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addIndex(
          'estimation_logs',
          ['uid'],
          {
            indexName: 'estimation_logs_uid_index',
          },
          { transaction: t }
        ),
        queryInterface.addIndex(
          'estimation_logs',
          ['rid'],
          {
            indexName: 'estimation_logs_rid_index',
            indicesType: 'UNIQUE'
          },
          { transaction: t }
        ),
        queryInterface.addIndex(
          'estimation_logs',
          ['updated_at'],
          {
            indexName: 'estimation_logs_updated_at_index'
          },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('estimation_logs', ['uid'], { transaction: t }),
        queryInterface.removeIndex('estimation_logs', ['rid'], { transaction: t } ),
        queryInterface.removeIndex('estimation_logs', ['updated_at'], { transaction: t }),
      ])
    })
  }
};
