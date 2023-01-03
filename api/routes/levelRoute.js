const { Router } = require('express');
const LevelController = require('../controllers/LevelController');

const levelRouter = Router();

levelRouter
	.get('/level', LevelController.findAllLevels)
	.get('/level/:id', LevelController.findLevel)
	.post('/level', LevelController.addLevel)
	.post('/level/:id/restore', LevelController.restoreLevel)
	.put('/level/:id', LevelController.updateLevel)
	.delete('/level/:id', LevelController.removeLevelById)
	.delete('/level/', LevelController.removeLevelByQuery);
    
module.exports = levelRouter;