// {
//     "development": {
//       "username": "root",
//       "password": null,
//       "database": "database_development",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "test": {
//       "username": "root",
//       "password": null,
//       "database": "database_test",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "production": {
//       "username": "root",
//       "password": null,
//       "database": "database_production",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     }
//   }
// This file exists because Sequelize only support import config as a string path, not an object
module.exports = require('../../config/config').sqlDB;