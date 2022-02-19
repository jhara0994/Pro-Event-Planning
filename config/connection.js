const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    'heroku_fe0dcfab6eaee08',
    'bb12d5d5ed812c',
    '6c8f2aae',
    {
      host: 'us-cdbr-east-05.cleardb.net',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;