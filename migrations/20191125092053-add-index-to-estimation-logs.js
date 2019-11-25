'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addIndex(
        'estimation_logs',
        ['uid'],
        {
          indexName: 'estimation_logs_uid_index',
        }
      ),
      queryInterface.addIndex(
        'estimation_logs',
        ['rid'],
        {
          indexName: 'estimation_logs_rid_index',
          indicesType: 'UNIQUE'
        }
      ),
      queryInterface.addIndex(
        'estimation_logs',
        ['updated_at'],
        {
          indexName: 'estimation_logs_updated_at_index'
        }
      ),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeIndex('estimation_logs', 'estimation_logs_uid_index'),
      queryInterface.removeIndex('estimation_logs', 'estimation_logs_rid_index'),
      queryInterface.removeIndex('estimation_logs', 'estimation_logs_updated_at_index'),
    ])
  }
};
