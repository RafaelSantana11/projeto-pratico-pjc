const express = require('express')
const router = express.Router()
const controller = require('../controllers/albums')
const validateToken = require('../middlewares/validate_token')

router.get('/albums', validateToken, controller.getAll) //rota que busca todos os albuns

router.post('/albums', validateToken, controller.create) //rota que cadastra um novo album

router.put('/albums/:id', validateToken, controller.update) //rota que atualiza os doados um determinado album

router.delete('/albums/:id', validateToken, controller.delete) //rota que cadastra um album específico

module.exports = router