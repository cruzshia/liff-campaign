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
          'users',
          ['uid'],
          {
            indexName: 'users_uid_index',
            indicesType: 'UNIQUE'
          },
          { transaction: t }
        ),
        queryInterface.addIndex(
          'users',
          ['updated_at'],
          {
            indexName: 'users_updated_at_index'
          },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('users', ['uid'], { transaction: t }),
        queryInterface.removeIndex('users', ['updated_at'], { transaction: t }),
      ])
    })
  }
};
