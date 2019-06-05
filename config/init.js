const fs = require('fs');
const path = require('path');
const pgtools = require('pgtools');
const prompt = require('prompt');

prompt.start();

new Promise((resolve, reject) => {
  prompt.get(
    [
      {
        name: 'DB_USER',
        description: 'PostgreSQL User (Default is postgres)',
        default: 'postgres'
      },
      {
        name: 'DB_PASSWORD',
        description: 'PostgreSQL Password',
        hidden: true
      },
      {
        name: 'DB_PORT',
        description: 'PSQL Server port (Default is 5432)',
        default: '5432'
      },
      {
        name: 'DB_HOST',
        description: 'PSQL Server running host (Default is localhost)',
        default: 'localhost'
      },
      {
        name: 'DB_NAME',
        description: 'Database name (default is map)',
        default: 'map'
      }
    ],
    (err, result) => {
      if (err) reject(err);
      resolve(result);
    }
  );
  })
  .then(createEnvFile)
  .then(({ DB_USER, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD }) => {
    return pgtools.createdb(
      { user: DB_USER, password: DB_PASSWORD, port: DB_PORT, host: DB_HOST },
      DB_NAME
    );
  })
  .then(() => {
    require('./table')();
  })
  .then(() => {
    console.log('Successfully created DB');
  });


function createEnvFile(environmentVariables) {
  return new Promise((resolve, reject) => {
    let outputDirectory = path.join(__dirname, '.env');
    let outputDirectoryRoot = path.join(__dirname, '../', '.env');
    // console.log(outputDirectory);
    let output = Object.keys(environmentVariables).reduce((output, variable) =>
      `${output}${variable}=${environmentVariables[variable]}\n`, ''
    );
    fs.writeFile(outputDirectoryRoot, output, 'utf8', (err, result) => {
      if (err) reject(err);
    });
    fs.writeFile(outputDirectory, output, 'utf8', (err, result) => {
      if (err) reject(err);
      resolve(environmentVariables);
    });
    
  });
}
