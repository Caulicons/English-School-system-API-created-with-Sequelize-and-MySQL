const bodyParser = require('body-parser')
const peopleRouter = require('./peopleRoute')

const Routes = app => {

  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.status(200).send("oi meu chapa...")
  })

  app.use(peopleRouter)
}

module.exports = Routes; 