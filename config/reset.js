const pgtools = require("pgtools");
const prompt = require("prompt");

prompt.start();

new Promise((resolve, reject) => {
  prompt.get(
    [
      {
        name: 'user',
        description: 'PostgreSQL User (Default is postgres)',
        default: 'postgres'
      },
      {
        name: 'password',
        description: 'PostgreSQL Password',
        hidden: true
      },
      {
        name: 'port',
        description: 'PSQL Server port (Default is 5432)',
        default: '5432'
      },
      {
        name: 'host',
        description: 'PSQL Server running host (Default is localhost)',
        default: 'localhost'
      }
    ],
    (err, result) => {
      if (err) reject(err);
      resolve(result);
    }
  );
  })
  .then(promptedValues => {
    return pgtools.dropdb(promptedValues, 'map');
  })
  .then(() => {
    console.log('Successfully Dropped DB');
  })
  .catch(console.error);