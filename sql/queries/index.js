const path = require('path');

const QueryFile = require('pg-promise').QueryFile;

const sql = (file) => {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, {
    minify: true
  });
}

module.exports = {
  getAll: sql('./marker/getAll.sql')
}