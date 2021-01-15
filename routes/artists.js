const express = require('express')
const router = express.Router()
const controller = require('../controllers/artists')
const validateToken = require('../middlewares/validate_token')

router.get('/artists', validateToken, controller.getAll) //rota que busca todos os artistas

router.post('/artists', validateToken, controller.create) //rota que cadastra um novo artista

router.put('/artists/:id', validateToken, controller.update) //rota que atualiza os doados um determinado artista

router.delete('/artists/:id', validateToken, controller.delete) //rota que cadastra um artista específico

module.exports = router