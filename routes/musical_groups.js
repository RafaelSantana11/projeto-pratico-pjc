const express = require('express')
const router = express.Router()
const controller = require('../controllers/musical_groups')
const validateToken = require('../middlewares/validate_token')

router.get('/musical-groups', validateToken, controller.getAll) //rota que busca todos os artistas

module.exports = router