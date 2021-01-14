'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('musical_groups', [
      {
        name: 'Artista solo',
        id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Guns N\'Roses',
        id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Forró Boys',
        id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
