const express = require('express')
const router = express.Router()
const controller = require('../controllers/artists')
const validateToken = require('../middlewares/validate_token')

router.get('/artists', validateToken, controller.getAll) //rota que busca todos os artistas

router.get("/artists/:id", validateToken, controller.getOne) //rota que busca os dados de um artista específico

module.exports = router