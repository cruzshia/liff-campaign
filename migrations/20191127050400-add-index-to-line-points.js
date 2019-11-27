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
        'line_points',
        ['uid'],
        {
          indexName: 'line_points_uid_index',
          indicesType: 'UNIQUE'
        }
      ),
      queryInterface.addIndex(
        'line_points',
        ['updated_at'],
        {
          indexName: 'line_points_updated_at_index'
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
      queryInterface.removeIndex('line_points', 'line_points_uid_index'),
      queryInterface.removeIndex('line_points', 'line_points_updated_at_index'),
    ])
  }
};
