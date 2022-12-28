const db = require('../models');

class MatriculationController {

  static findAllMatriculations = async (req, res) => {
    
    const query = req.query;
    try {

      if (!query) {
        const search = await db.Matriculations.findAll()
        return res.status(200).json(search)
      }

      const search = await db.Matriculations.findAll({
        where: query
      })

      if (!search) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...')

      res.status(200).json(search)
    } catch (err) {

      res.status(500).json(err.message)
    }
  }

  static findMatriculation = async (req, res) => {

    const { id } = req.params

    try {
      const search = await db.Matriculations.findOne({
        where: {
          id: Number(id)
        }
      })

      if(!search) throw new Error(search);

      res.status(200).json(search)
    } catch (err) {

      res.status(500).json("Não foi possível encontra a matricula que solicitou, reveja as query...")
    }
  }

  static updateMatriculation = async (req, res) => {

    const body = req.body;
    const { id } = req.params;

    try {

      const updatedPerson = await db.Matriculations.update(body, {
        where: {
          id: id
        }
      })

      console.log(updatedPerson);

      res.status(200).json(updatedPerson)
    } catch (err) {

      res.status(500).json(err.message)
    }

  }

  static addMatriculation = async (req, res) => {

    const person = req.body;
    try {

      const personCreated = await db.Matriculations.create(person)

      res.status(200).json(personCreated)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  static removeMatriculationById = async (req, res) => {

    const { id } = req.params
    try {
      const search = await db.Matriculations.destroy({
        where: {
          id: Number(id)
        }
      })

      if (search === 0) throw new Error('Não foi dessa vez meu caro..., reveja o ID');

      res.status(200).json('Success delete :,)')
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  static removeMatriculationByQuery = async (req, res) => {

    const query = req.query
    try {
      const search = await db.Matriculations.destroy({
        where: query
      })

      console.log(search)

      res.status(200).json(search)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}




module.exports = MatriculationController;