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
        'users',
        ['uid'],
        {
          indexName: 'users_uid_index',
          indicesType: 'UNIQUE'
        }
      ),
      queryInterface.addIndex(
        'users',
        ['updated_at'],
        {
          indexName: 'users_updated_at_index'
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
      queryInterface.removeIndex('users', 'users_uid_index'),
      queryInterface.removeIndex('users', 'users_updated_at_index'),
    ])
  }
};
