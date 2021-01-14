'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('artists', [
      {
        name: 'Serj Tankian',
        id: 1,
        musical_group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Mike Shinoda',
        id: 2,
        musical_group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Michel Teló',
        id: 3,
        musical_group_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },      
      {
        name: 'Guns N\'Roses',
        id: 4,
        musical_group_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Roger',
        id: 5,
        musical_group_id: 3,
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
