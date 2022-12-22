const { Router } = require("express");
const PeopleController = require("../controller/peopleController");

const peopleRouter = Router();

  peopleRouter
    .get('/people', PeopleController.findAllPeople)

module.exports = peopleRouter;