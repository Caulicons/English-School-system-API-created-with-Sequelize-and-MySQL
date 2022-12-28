const { Router } = require("express");
const ClassController = require("../controllers/ClassController");

const peopleRouter = Router();

  peopleRouter
    .get('/class', ClassController.findAllClasses)
    .get('/class/:id', ClassController.findClass)
    .post('/class', ClassController.addClass)
    .put('/class/:id', ClassController.updateClass)
    .delete('/class/:id', ClassController.removeClassById)
    .delete('/class/', ClassController.removeClassByQuery)
    
module.exports = peopleRouter;