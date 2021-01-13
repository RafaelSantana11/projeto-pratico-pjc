var express = require('express');
var router = express.Router();

const { sequelize } = require("../models")

router.get('/sincronizar', (req, res) => {
    sequelize.sync({ force: true }).then(() => res.send('BD SINCRONIZADO'))
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;