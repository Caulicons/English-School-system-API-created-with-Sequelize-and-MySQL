const { Router } = require('express');
const ClassController = require('../controllers/ClassController');

const classesRouter = Router();

classesRouter
	.get('/class', ClassController.findAllClasses)
	.get('/class/:id', ClassController.findClass)
	.get('/class/all/crowded', ClassController.findClassCrowded)
	.post('/class', ClassController.addClass)
	.post('/class/:id/restore', ClassController.restoreClass)
	.put('/class/:id', ClassController.updateClass)
	.delete('/class/:id', ClassController.removeClassById)
	.delete('/class/', ClassController.removeClassByQuery);
    
module.exports = classesRouter;