'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addIndex(
          'amazon_coupons',
          ['updated_at'],
          {
            indexName: 'amazon_coupons_updated_at_index'
          },
          { transaction: t }
        ),
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeIndex('amazon_coupons', ['updated_at'], { transaction: t }),
      ])
    })
  }
};
