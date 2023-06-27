'use strict';
const { faker } = require('@faker-js/faker');

const doorsManufacturers = [
  'Лабиринт',
  'ASD',
  'Bravo'
];
/**
 * Надо подумать тут какие еще фильтры могут быть во втором массиве
 */
// const doorsManufacturers = [
//   'Лабиринт',
//   'ASD',
//   'Bravo'
// ];


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Doors',
      [...Array(100)].map(() => ({
        doors_manufacturer: doorsManufacturers[Math.floor(Math.random() * doorsManufacturers.length)],
        price: faker.datatype.number({ min: 5000, max: 100000 }),
        name: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify([...Array(7)].map(() => `${faker.image.technics()}?random=${faker.random.numeric(1)}`
        )
        ),
        vendor_code: faker.internet.password(),
        in_stock: faker.datatype.number(100),
        bestsellers: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.datatype.number(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Doors', null, {});
  },
}
