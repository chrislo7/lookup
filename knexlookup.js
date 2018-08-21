let input = process.argv[2]
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

function output(data) {
  for (x of data){
    console.log('Found your query: ')
    console.log(x.first_name, x.last_name, x.birthdate);
  }
}

knex('famous_people')
  .select('first_name', 'last_name', 'birthdate')
  .where({first_name: input})
  .orWhere({last_name: input})
  .asCallback(function(err, rows) {
      if (err) return console.error(err);
      output(rows)
      knex.destroy(); //terminates the process
    });