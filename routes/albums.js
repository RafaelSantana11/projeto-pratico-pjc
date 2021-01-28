const express = require('express')
const router = express.Router()
const controller = require('../controllers/albums')
const validateToken = require('../middlewares/validate_token')

router.get('/albums', validateToken, controller.getAll) //rota que busca todos os artistas

router.post('/albums', validateToken, controller.create) //rota que cadastra um novo artista

router.put('/albums/:id', validateToken, controller.update) //rota que atualiza os doados um determinado artista

router.delete('/albums/:id', validateToken, controller.delete) //rota que cadastra um artista específico

module.exports = router