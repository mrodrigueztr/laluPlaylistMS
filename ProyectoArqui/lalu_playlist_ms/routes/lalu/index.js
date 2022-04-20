// RUTAS lALU
const router = require('express').Router();

router.use('/playlists', require('./playlist.route'))

module.exports = router;