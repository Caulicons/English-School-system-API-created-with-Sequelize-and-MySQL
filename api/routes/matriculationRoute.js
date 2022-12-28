const { Router } = require("express");
const MatriculationController = require("../controllers/matriculationController");

const matriculationRouter = Router();

  matriculationRouter
    .get('/matriculation', MatriculationController.findAllMatriculations)
    .get('/matriculation/:id', MatriculationController.findMatriculation)
    .post('/matriculation', MatriculationController.addMatriculation)
    .put('/matriculation/:id', MatriculationController.updateMatriculation)
    .delete('/matriculation/:id', MatriculationController.removeMatriculationById)
    .delete('/matriculation/', MatriculationController.removeMatriculationByQuery)
    
module.exports = matriculationRouter;