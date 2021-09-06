const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'root',
    password: 'password123',
    first_name: 'root',
    last_name: 'toor'
  },
  {
    username: 'tielkingc',
    password: 'qwertyuiop',
    first_name: 'Christian',
    last_name: 'Tielking'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
