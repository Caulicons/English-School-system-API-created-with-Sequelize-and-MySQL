const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController');

const peopleRouter = Router();

peopleRouter
	.get('/people', PeopleController.findAllPeople)
	.get('/people/active', PeopleController.findAllPeopleActive)
	.get('/people/:id', PeopleController.findPerson)
	.get('/people/:student_id/matriculations/:matriculation_id', PeopleController.findOneMatriculationOfStudent)
	.get('/people/:student_id/matriculations', PeopleController.findAllMatriculationOfStudent)
	.get('/people/:teacher_id/classes/:class_id', PeopleController.findOneMatriculationOfStudent)
	.get('/people/:teacher_id/classes/', PeopleController.findAllMonitoredClassesByTeacherID)
	.post('/people', PeopleController.addPerson)
	.post('/people/:id/restore', PeopleController.restorePerson)
	.post('/people/:student_id/cancel', PeopleController.cancelPeople)
	.put('/people/:id', PeopleController.updatePerson)
	.delete('/people/:id', PeopleController.removePersonById)
	.delete('/people/', PeopleController.removePersonByQuery)
//
	.post('/people/:student_id/matriculations', PeopleController.addStudentMatriculation)
	.post('/people/:student_id/matriculations/:matriculation_id/restaure', PeopleController.restaureStudentMatriculation)
	.put('/people/:student_id/matriculations/:matriculation_id', PeopleController.updateStudentMatriculation)
	.delete('/people/:student_id/matriculations/:matriculation_id', PeopleController.removeStudentMatriculation);

module.exports = peopleRouter;