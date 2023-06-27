'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Doors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    doors_manufacturer: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    vendor_code: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    configuration: {
      type: Sequelize.STRING(2048),
    },
    description: {
      type: Sequelize.STRING(2048),
    },
    images: {
      type: Sequelize.STRING(1000),
    },
    in_stock: {
      type: Sequelize.INTEGER,
    },
    bestsellers: {
      type: Sequelize.BOOLEAN,
    },
    new: {
      type: Sequelize.BOOLEAN,
    },
    popularity: {
      type: Sequelize.INTEGER,
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Doors');
}