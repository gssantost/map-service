const path = require('path');
const QueryFile = require('pg-promise').QueryFile;
const { db } = require('./db');

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, {
    minify: true
  });
}

const tableCreation = () => {
  db.tx(t => {
    const createInitialTables = t.none(sql('../sql/init.sql'));
    const createMarkers = t.none(sql('../sql/data.sql'));
    return t.batch([createInitialTables, createMarkers]);
  })
  .then(async () => {
    console.log('Successfully created tables on DB');
    console.log('Successfully added records on DB');
  })
  .catch(error => {
    console.error(error);
    console.error('Something went wrong. Execute reset.js');
  })
};

module.exports = tableCreation;
