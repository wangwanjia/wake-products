// config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    timezone: '+08:00', // 关键：设置为北京时间（UTC+8）
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }

  }
);

module.exports = database;
