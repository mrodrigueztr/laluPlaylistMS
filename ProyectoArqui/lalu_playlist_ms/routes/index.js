// RUTAS GLOBALES
const router = require('express').Router();

router.use('/lalu', require('./lalu'));
module.exports = router;