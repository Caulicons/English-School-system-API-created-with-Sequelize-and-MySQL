const bodyParser = require('body-parser')
const classesRouter = require('./classesRoute')
const levelRouter = require('./levelRoute')
const peopleRouter = require('./peopleRoute')

const Routes = app => {

  app.use(
    bodyParser.json(),
    peopleRouter,
    classesRouter,
    levelRouter
  )

  app.get('/', (req, res) => {
    res.status(200).send("oi meu chapa...")
  })
}

module.exports = Routes; 