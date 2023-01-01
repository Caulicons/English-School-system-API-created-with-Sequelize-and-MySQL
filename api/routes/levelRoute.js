const { Router } = require('express');
const LevelController = require('../controllers/LevelController');

const levelRouter = Router();

levelRouter
	.get('/level', LevelController.findAllLevels)
	.get('/level/:id', LevelController.findLevel)
	.post('/level', LevelController.addLevel)
	.put('/level/:id', LevelController.updateLevel)
	.delete('/level/:id', LevelController.removeLevelById)
	.delete('/level/', LevelController.removeLevelByQuery);
    
module.exports = levelRouter;