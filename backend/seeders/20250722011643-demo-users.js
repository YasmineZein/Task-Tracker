'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          userId: 1,
          name: 'Yasmine Zein',
          email: 'yasmine@example.com',
          password: '$2b$10$examplehash', // Use real hashed passwords in production
          created_at: new Date(),
        },
        {
          userId: 2,
          name: 'Ahmed Zein',
          email: 'ahmed@example.com',
          password: '$2b$10$examplehash2',
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'Users',
      { userId: { [Sequelize.Op.in]: [1, 2] } },
      {},
    );
  },
};
