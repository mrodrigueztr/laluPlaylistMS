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
        return res.json({msage : `Canciones de Playlist Encontradas`,data : playlists} );
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});


router.get('/id/:playlist_id', async (req,res) => {
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
        return res.json({msage : 'Canciones encontradas',data : playlists});
    } catch (error) {
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.post('/newPlaylist', async (req,res) => {
    req.body.playlist_songs = []
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

router.put('/:playlist_id/updates/songs/:song_id', async (req,res) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlist_id,
        );

        playlist.playlist_songs.push(req.params.song_id)
        const newPlaylist = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            playlist,
            { new : true}
        )
        return res.json({msage : 'Cancion Agregada a la PLaylist',data : newPlaylist})

    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.put('/:playlist_id/delete/songs/:song_id', async (req,res) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlist_id,
        );
        const index = playlist.playlist_songs.indexOf(req.params.song_id);
        if(index !== -1){playlist.playlist_songs.splice(index,1)}
        
        const newPlaylist = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            playlist,
            { new : true}
        )
        return res.json({msage : 'Cancion Eliminada de la PLaylist',data : newPlaylist})

    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Ha ocurrido un error'});
    }
});

router.delete('/:playlist_id', async (req,res) =>{
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.playlist_id);
        return res.json({msage : 'Playlist Actualizada',data : playlist}); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : 'Ha ocurrido un error'});
    }
})

module.exports = router;