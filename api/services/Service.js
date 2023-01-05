const database = require('../models');

class Services {
  constructor(moduleName) {
    this.moduleName = moduleName;
  }

  getAllRegistry = async (where = {}) => {
    console.log(where);
    return await database[this.moduleName].findAll({ where });
  };

  getRegistryByID = async (id) => {

    return await database[this.moduleName].findOne({
      where: {
        id: Number(id)
      }
    });
  };

  addRegistry = async (Registry) => {

    return await database[this.moduleName].create(Registry);
  };

  updateRegistry = async (body, id) => {

    return await database[this.moduleName].update(body, {
      where: {
        id: Number(id)
      }
    });
  };

  deleteRegistryByID = async (id) => {

    return await database[this.moduleName].destroy({
      where: {
        id: Number(id)
      }
    });
  };

  deleteRegistryByQuery = async (query) => {

    return await database[this.moduleName].destroy({
      where: query
    });
  };

  restoreRegistryByID = async (id) => {

    return await database[this.moduleName].restore({
      where: { id: Number(id) }
    });
  };
}

module.exports = Services;