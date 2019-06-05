const { Marker } = require('../models');

module.exports.getAll = async (req, res) => {
  const send = (status,body) => res.status(status).send({status,data:body});
  const marker = new Marker();
  try {
    const data = await marker.getAll();
    send (200, 
      data
    )
  } catch (err) {
    throw err;
  }
}