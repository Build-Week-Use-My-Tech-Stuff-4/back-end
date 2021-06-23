const knex = require('knex');
const configs = require('../knexfile');
const environment = process.env.NODE_ENV 
? process.env.NODE_ENV.replace(" ", "")
: "development";
module.exports = knex(configs[environment]);