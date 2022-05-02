const router = require('express').Router();
const Playlist = require('../../models/playlist.model');


router.get('/', async(req,res) => {
    try {
        const playlists = await Playlist.find();
         return res.json({msage : 'Playlist Encontradas',data : playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.get('/username/:playlist_username', async(req,res) => {
    try {
        const playlists = await Playlist.find({playlist_username:req.params.playlist_username});
        return res.json({msage : 'Playlist Encontrada ',data : playlists});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.get('/username/:playlist_username/:playlist_name', async(req,res) => {
    try {
        const playlists = await Playlist.find({
            username: req.params.playlist_username,
            playlist_name: req.params.playlist_name
        });
        return res.json({msage : `Playlist Encontrada`,data : playlists} );
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.get('/username/:username/:playlist_name/songs', async(req,res) => {
    try {
        const playlists = await Playlist.findOne({
            username: req.params.username,
            playlist_name: req.params.playlist_name
        });
        return res.json({msage : `Canciones de Playlist Encontradas`,data : playlists.playlist_songs} );
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});


router.get('/id/:playlist_id', async (req,res) => {
    console.log(req.params.playlist_id)
    try {
        
        const playlistById = await Playlist.findById(
            req.params.playlist_id,
        );
        return res.json({msage : 'Playlist Encontrada',data : playlistById})
    } catch (error) {
        res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.get('/id/:playlist_id/songs', async(req,res) => {
    try {
        
        const playlists = await Playlist.findById(req.params.playlist_id);
        return res.json({msage : 'Canciones encontradas',data : playlists.playlist_songs});
    } catch (error) {
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.post('/', async (req,res) => {
    try {
        const newPlaylist =  await Playlist.create(req.body);
        return res.json({msage : 'Playlist Creada',data : newPlaylist});
    } catch (error) {
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.put('/:playlist_id', async (req,res) => {
    try {
        const playlistEdit = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            req.body,
            { new : true}
        );
        return res.json({msage : 'Playlist Actualizada',data : playlistEdit})

    } catch (error) {
        res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.delete('/:playlist_id', async (req,res) =>{
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.playlist_id);
        return res.json({msage : 'Playlist Eliminada',data : playlist}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
})

module.exports = router;