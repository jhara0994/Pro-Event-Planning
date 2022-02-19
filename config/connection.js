const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
<<<<<<< HEAD
<<<<<<< HEAD
    'heroku_fe0dcfab6eaee08',
    'bb12d5d5ed812c',
    '6c8f2aae',
=======
    'heroku_e9dd7ba12403b4f?reconnect=true',
    'b9e3de41fc99fc',
    '666069f3',
>>>>>>> df4c6d8 (Changed connection variables for production)
=======
    'heroku_6bb1a85ff64ed6a',
    'bc4161daa20872',
    '85d0c14',
>>>>>>> 8bd942f (Fixed variables)
    {
      host: 'us-cdbr-east-05.cleardb.net',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;