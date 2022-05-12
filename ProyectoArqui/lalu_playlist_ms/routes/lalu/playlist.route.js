const router = require('express').Router();
const {
    getAllPlaylists, getAllPlaylistByUsername, getPlaylistByNameUsingUsername,
    getPlaylistSongsByNameUsingUsername, getPlaylistById, getPlaylistSongsById,
    createNewPlaylist, updatePlaylistById, addSongsToThePlaylist,
    deleteSongsFromThePlaylist, deletePlaylist
} = require('../../controllers/playlist.controller')


router.get('/', getAllPlaylists);
router.get('/username/:playlist_username', getAllPlaylistByUsername);
router.get('/username/:playlist_username/:playlist_name', getPlaylistByNameUsingUsername);
router.get('/username/:username/:playlist_name/songs', getPlaylistSongsByNameUsingUsername);
router.get('/id/:playlist_id', getPlaylistById);
router.get('/id/:playlist_id/songs', getPlaylistSongsById);
router.post('/newPlaylist', createNewPlaylist);
router.put('/:playlist_id', updatePlaylistById);
router.put('/:playlist_id/updates/songs/:song_id', addSongsToThePlaylist);
router.put('/:playlist_id/delete/songs/:song_id', deleteSongsFromThePlaylist);
router.delete('/:playlist_id', deletePlaylist);

module.exports = router;