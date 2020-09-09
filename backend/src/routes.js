const { Router } = require('express')
const MakerController = require('./controllers/MakerController')
const SearchController = require('./controllers/SearchController')
const LoginController = require('./controllers/LoginController')

const routes = Router()


routes.get('/login', LoginController.index)
routes.post('/login', LoginController.store)

routes.get('/maker', MakerController.index)
routes.post('/maker', MakerController.store)

routes.get('/search', SearchController.index)

module.exports = routes