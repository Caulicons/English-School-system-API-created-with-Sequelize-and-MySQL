const { Router } = require("express");
const PeopleController = require("../controller/peopleController");

const peopleRouter = Router();

  peopleRouter
    .get('/people', PeopleController.findAllPeople)
    .get('/people/:id', PeopleController.findPerson)
    .post('/people', PeopleController.addPerson)
    .put('/people/:id', PeopleController.updatePerson)
    .delete('/people/:id', PeopleController.removePersonById)
    .delete('/people/', PeopleController.removePersonByQuery)
    

module.exports = peopleRouter;