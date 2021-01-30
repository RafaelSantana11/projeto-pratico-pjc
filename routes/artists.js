const express = require('express')
const router = express.Router()
const controller = require('../controllers/artists')
const validateToken = require('../middlewares/validate_token')

router.get('/artists', validateToken, controller.getAll) //rota que busca todos os artistas

module.exports = router