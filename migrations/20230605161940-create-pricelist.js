'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pricelists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      year_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vehicle_years",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      model_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Vehicle_models",
          key: "id"
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pricelists');
  }
};