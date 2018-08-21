let firstname = process.argv[2];
let lastname = process.argv[3];
let date = process.argv[4];

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('famous_people')
  .insert(
    { first_name: firstname, last_name: lastname, birthdate: date })