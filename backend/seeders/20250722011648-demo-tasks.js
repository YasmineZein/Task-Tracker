'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Tasks', [{
      userId: 1, 
      title: 'Complete project draft',
      description: 'Finish the initial project documentation',
      status: 'In progress'
    }, {
      userId: 1,
      title: 'Review PRs',
      status: 'To-do'
    }, {
      userId: 2, 
      title: 'Update dependencies',
      status: 'Done'
    }, {
      userId: 2,
      title: 'Prepare for meeting',
      description: 'Gather all necessary documents and reports',
      status: 'To-do',
      estimate_time: 2, 
      logged_time: 0.5, 
      due_date: new Date('2025-08-01'),
      priority: 1 
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', { taskId: { [Sequelize.Op.in]: [1, 2, 3] } }, {});
  }
};
