const { Router } = require('express');
const LevelController = require('../controllers/LevelController');

const levelRouter = Router();

levelRouter
	.get('/levels', LevelController.findAllLevels)
	.get('/levels/:id', LevelController.findLevel)
	.post('/levels', LevelController.addLevel)
	.post('/levels/:id/restore', LevelController.restoreLevel)
	.put('/levels/:id', LevelController.updateLevel)
	.delete('/levels/:id', LevelController.removeLevelById);
    
module.exports = levelRouter;