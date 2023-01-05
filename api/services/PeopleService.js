const Services = require('./Service');
const database = require('../models');

class PeopleService extends Services {
  constructor() {
    super('People');
  }

  getAllActivePeople = async () => {

    return await database[this.moduleName].scope('justActive').findAll();
  };

  cancelPerson = async (id) => {

    return database.sequelize.transaction(async (t) => {

      await database.People.update({ active: false }, {
        where: {
          id: Number(id)
        }
      }, { transaction: t });

      await database.Matriculations.update({ status: 'canceled' }, {
        where: {
          student_id: Number(id)
        }
      }, { transaction: t });
    });
  };

  getAssociateFunctionByRoleID = async (IDs) => {
    const handlingInput = {
      student_id: {
        id: IDs.student_id,
        occupationID:  IDs.matriculation_id,
        getAssociate: 'getConfirmedMatriculations'
      },
      teacher_id: {
        id: IDs.teacher_id,
        occupationID: IDs.class_id,
        getAssociate: 'getMonitoredClasses'
      }
    };

    const input = handlingInput[Object.keys(IDs)[0]];
    const person = await database[this.moduleName].findOne( {where: {id: Number(input.id)}});
    const arrayRes = await person[input.getAssociate]();
  
    return await arrayRes.find(registry => registry.id == input.occupationID);
    };

  getAllAssociateFunctionByRoleID = async (roleID) => {
    const handlingInput = {
      estudante: {
        error: 'Student not found with this ID',
        getAssociate: 'getConfirmedMatriculations'
      },
      docente: {
        error: 'Teacher not found with this ID',
        getAssociate: 'getMonitoredClasses'
      },
    };

    const person = await database[this.moduleName].findOne({ where: { id: Number(roleID) } });

    if (!person) throw new Error(`${handlingInput[person?.role]?.error ?
      handlingInput[person?.role]?.error : 'not found nobody with this ID'} `);

    return await person[handlingInput[person.role].getAssociate]();
  };
}

module.exports = PeopleService;