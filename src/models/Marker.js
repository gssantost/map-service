const { db } = require('../../config/db');
const queries = require('../../sql/queries');

class Marker {

  async getAll() {
    try {
      const obj = await db.connect();
      const data = await obj.any(queries.getAll);
      obj.done();
      return data;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = Marker;