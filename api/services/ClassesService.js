const Service = require('./Service');
const { literal } = require('sequelize');
const database = require('../models')

class ClassesService extends Service {
  constructor() {
    super('Classes');
  }

  getClassCrowded = async () => {
    const numberMaxOfStudent = 2;
    return await database.Matriculations
      .findAndCountAll({
        attributes: ['class_id'],
        group: ['class_id'],
        having: literal(`count(class_id) >= ${numberMaxOfStudent}`)
      });
  };

  getAllClassMatriculations = async (id) => {

    const classe = await database[this.moduleName].findOne({
      where: { id: Number(id) }
    });

    const res = await classe.getClasseMatriculations();
    console.log(res);
    return await res;
  };
}

module.exports = ClassesService;