const db = require('../models');

class ClassController {

  static findAllClasses = async (req, res) => {
    
    const query = req.query;
    try {

      if (!query) {
        const search = await db.Classes.findAll()
        return res.status(200).json(search)
      }

      const search = await db.Classes.findAll({
        where: query
      })

      if (!search) throw new Error('Não foi possível encontra a pessoa que solicitou, reveja as query...')

      res.status(200).json(search)
    } catch (err) {

      res.status(500).json(err.message)
    }
  }

  static findClass = async (req, res) => {

    const { id } = req.params

    try {
      const search = await db.Classes.findOne({
        where: {
          id: Number(id)
        }
      })

      if(!search) throw new Error(search);

      res.status(200).json(search)
    } catch (err) {

      res.status(500).json("Não foi possível encontra a pessoa que solicitou, reveja as query...")
    }
  }

  static updateClass = async (req, res) => {

    const body = req.body;
    const { id } = req.params;

    try {

      const updatedPerson = await db.Classes.update(body, {
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

  static addClass = async (req, res) => {

    const person = req.body;
    try {

      const personCreated = await db.Classes.create(person)

      res.status(200).json(personCreated)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }

  static removeClassById = async (req, res) => {

    const { id } = req.params
    try {
      const search = await db.Classes.destroy({
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

  static removeClassByQuery = async (req, res) => {

    const query = req.query
    try {
      const search = await db.Classes.destroy({
        where: query
      })

      console.log(search)

      res.status(200).json(search)
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
}




module.exports = ClassController;