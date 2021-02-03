const express = require('express')
const router = express.Router()
const controller = require('../controllers/albums')
const validateToken = require('../middlewares/validate_token')
const validate = require('../validators/albums')

const multer = require("multer");

router.get('/albums', validateToken, controller.getAll) //rota que busca todos os albuns

router.post('/albums',
  validateToken,
  multer({ storage: multer.memoryStorage() }).array('file'),
  validate,
  controller.create
) //rota que cadastra um novo album

router.get('/albums/:id', validateToken, controller.getOne) //rota que busca os dados de um album específico

router.put('/albums/:id', validateToken, validate, controller.update) //rota que atualiza os doados um determinado album

router.delete('/albums/:id', validateToken, controller.delete) //rota que cadastra um album específico

router.delete('/albums/:id/files', validateToken, controller.deleteAlbumFiles) //rota que deleta os arquivos de um álbum

module.exports = router