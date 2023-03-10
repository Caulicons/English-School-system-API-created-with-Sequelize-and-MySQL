const { Router } = require("express");
const PeopleController = require("../controllers/PeopleController");

const peopleRouter = Router();

  peopleRouter
    .get('/people', PeopleController.findAllPeople)
    .get('/people/:id', PeopleController.findPerson)
    .post('/people', PeopleController.addPerson)
    .put('/people/:id', PeopleController.updatePerson)
    .delete('/people/:id', PeopleController.removePersonById)
    .delete('/people/', PeopleController.removePersonByQuery)

    /* .get('/people/matriculations', PeopleController.findAllMatriculation) */
    .get('/people/:student_id/matriculation', PeopleController.findAllMatriculationOfStudent)
    .get('/people/:student_id/matriculation/:matriculation_id', PeopleController.findMatriculationOfStudent)
    .post('/people/:student_id/matriculation', PeopleController.addStudentMatriculation)
    .put('/people/:student_id/matriculation/:matriculation_id', PeopleController.updateStudentMatriculation)
    .delete('/people/:student_id/matriculation/:matriculation_id', PeopleController.removeStudentMatriculation)
    
    
module.exports = peopleRouter;