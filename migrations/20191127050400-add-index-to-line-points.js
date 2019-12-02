'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addIndex(
          'line_points',
          ['uid'],
          {
            indexName: 'line_points_updated_at_index'
          },
          { transaction: t }
        ),
        queryInterface.addIndex(
          'line_points',
          ['updated_at'],
          {
            indexName: 'line_points_updated_at_index'
          },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('line_points', ['uid'], { transaction: t }),
        queryInterface.removeIndex('line_points', ['updated_at'], { transaction: t }),
      ])
    })
  }
};
