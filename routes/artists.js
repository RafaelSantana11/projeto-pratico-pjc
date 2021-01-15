const express = require('express')
const router = express.Router()
const controller = require('../controllers/sync')
const validateToken = require('../middlewares/validate_token')

router.get('/artists', validateToken, controller.getAll)

module.exports = router