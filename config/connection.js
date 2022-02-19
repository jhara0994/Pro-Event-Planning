const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    'heroku_e9dd7ba12403b4f?reconnect=true',
    'b9e3de41fc99fc',
    '666069f3',
    {
      host: 'us-cdbr-east-05.cleardb.net',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;