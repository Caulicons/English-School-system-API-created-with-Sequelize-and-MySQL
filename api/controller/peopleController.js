const db = require('../models');

class PeopleController {

  static findAllPeople = async (req, res) => {

    try {

      const search = await db.People.findAll()

      res.status(200).json(search)
    } catch (err) {

      res.status(500).json(err.message)
    }
  }
}

module.exports = PeopleController;