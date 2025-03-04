// AQUI VAMOS FAZER A CONFIGURACAO DA BASE DE DADOS

require('dotenv').config();
module.exports = {

dialect: 'mariadb',

host: process.env.DATABASE_HOST,

port: process.env.DATABASE_PORT,

username: process.env.DATABASE_USERNAME,

password: process.env.DATABASE_PASSWORD,

database: process.env.DATABASE_NAME,

define:{

  timestamps: true,


  underscoredAll: true,

},

dialectOptions: {

  timezone: '+01:00',

  connectTimeout: 10000,
},

timezone: '+01:00'


}
