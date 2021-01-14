'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('albums', [
      {
        name: 'Harakiri',
        id: 1,
        publication_year: '1962',
        artist_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Black Blooms',
        id: 2,
        publication_year: '2019',
        artist_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Black Blooms',
        id: 3,
        publication_year: '2016',
        artist_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'The Rising Tied',
        id: 4, 
        publication_year: '2005',
        artist_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Post Traumatic',
        id: 5, 
        publication_year: '2018',
        artist_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Post Traumatic EP',
        id: 6, 
        publication_year: '2018',
        artist_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bem Sertanejo',
        id: 7,
        publication_year: '2015',
        artist_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bem Sertanejo 2',
        id: 8,
        publication_year: '2015',
        artist_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Use Your IIIlusion I',
        id: 9,
        publication_year: '1991',
        artist_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Greatest Hits',
        id: 10,
        publication_year: '1981',
        artist_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Volume 1',
        id: 11,
        publication_year: '2010',
        artist_id: 5,
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
