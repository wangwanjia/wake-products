const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const database = require('../config/database');

const db = {};

// 自动加载所有模型
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const modelModule = require(path.join(__dirname, file));
    const model = typeof modelModule === 'function' ? modelModule(database, Sequelize.DataTypes) : modelModule;
    db[model.name] = model;
  });

// 设置关联关系
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.database = database;
db.Sequelize = Sequelize;

module.exports = db;