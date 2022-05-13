const router = require('express').Router();
const {
    getAllPlaylistsAlbums, getAllPlaylistAlbumsByUsername, getPlaylistByNameUsingUsername,
    getPlaylistSongsByNameUsingUsername, getPlaylistById, getPlaylistSongsById,
    createNewPlaylist, updatePlaylistById, addSongsToThePlaylist,
    deleteSongsFromThePlaylist, deletePlaylist,getAllPlaylistByUsername,getAllAlbumsByUsername
} = require('../../controllers/playlist.controller')


router.get('/', getAllPlaylistsAlbums);
router.get('/username/:playlist_username', getAllPlaylistAlbumsByUsername);
router.get('/username/:playlist_username/playlist', getAllPlaylistByUsername);
router.get('/username/:playlist_username/albums', getAllAlbumsByUsername);
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