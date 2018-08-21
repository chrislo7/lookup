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
  for (x of data.rows){
    let first = x.first_name;
    let last = x.last_name;
    let birthday = x.birthdate;
    console.log(`Found the person you were looking for:`)
    console.log(`${first} ${last}, born ${birthday}`)
  }
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
