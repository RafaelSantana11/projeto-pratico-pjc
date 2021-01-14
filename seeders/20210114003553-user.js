'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('users', [
      {
        name: 'Usuário do sistema',
        email: 'usuario@teste.com',
        password: '$2a$10$566DC5Anl8ozMlEzZBXgouD7OUSO4If77hU6vwH5X4Y/KkDNBouZ6', //hash para: dxK86g#
        id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
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
