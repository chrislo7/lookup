let input = process.argv[2]

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function output(data) {
  let first = data.rows[0].first_name;
  let last = data.rows[0].last_name;
  let birthday = data.rows[0].birthdate;
  console.log(
    `Found the person you were looking for: ${first} ${last}, born ${birthday}`
  )
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(
    `select first_name, last_name, birthdate from famous_people where first_name = '${input}' OR last_name = '${input}';`,
    [], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
     output(result);
      client.end();
    });
});
