const Playlist = require('../models/playlist.model');

getAllPlaylistsAlbums = async (req, res) => {
    try {
        const playlists = await Playlist.find();
        return res.json({ msage: 'Playlist-albums Encontrados', data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

getAllPlaylistAlbumsByUsername = async (req, res) => {
    try {
        const playlists = await Playlist.find({ playlist_username: req.params.playlist_username });
        return res.json({ msage: 'Playlist-albums del artista Encontrados ', data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

getAllPlaylistByUsername = async (req, res) => {
    try {
        const playlists = await Playlist.find({
            playlist_username: req.params.playlist_username,
            playlist_privacity: true,
        });
        return res.json({ msage: 'Playlist Encontradas ', data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

getAllAlbumsByUsername = async (req, res) => {
    try {
        const playlists = await Playlist.find({
            playlist_username: req.params.playlist_username,
            playlist_privacity: false,
        });
        return res.json({ msage: 'Albumes Encontrados ', data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};


getPlaylistByNameUsingUsername = async (req, res) => {
    try {
        const playlists = await Playlist.find({
            playlist_username: req.params.playlist_username,
            playlist_name: req.params.playlist_name
        });
        return res.json({ msage: `Playlist-Album Encontrado`, data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

getPlaylistSongsByNameUsingUsername = async (req, res) => {
    try {
        const playlists = await Playlist.findOne({
            playlist_username: req.params.username,
            playlist_name: req.params.playlist_name
        });
        return res.json({ msage: `Canciones de Playlist-album Encontrados`, data: playlists });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

getPlaylistById = async (req, res) => {
    try {
        const playlistById = await Playlist.findById(
            req.params.playlist_id,
        );
        return res.json({msage : 'Playlist-Album Encontrado',data : playlistById})
    } catch (error) {
        res.status(500).json({error : 'Ha ocurrido un error'});
    }
};

getPlaylistSongsById = async (req, res) => {
    try {

        const playlists = await Playlist.findById(req.params.playlist_id);
        return res.json({ msage: 'Canciones encontradas', data: playlists });
    } catch (error) {
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

createNewPlaylist = async (req, res) => {
    req.body.playlist_songs = []
    try {
        const newPlaylist = await Playlist.create(req.body);
        return res.json({ msage: 'Playlist-album Creado', data: newPlaylist });
    } catch (error) {
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

updatePlaylistById = async (req, res) => {
    try {
        const playlistEdit = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            req.body,
            { new: true }
        );
        return res.json({ msage: 'Playlist-album Actualizado', data: playlistEdit })

    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

addSongsToThePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlist_id,
        );

        playlist.playlist_songs.push(req.params.song_id)
        const newPlaylist = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            playlist,
            { new: true }
        )
        return res.json({ msage: 'Cancion Agregada a la PLaylist-album', data: newPlaylist })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

deleteSongsFromThePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findById(
            req.params.playlist_id,
        );
        const index = playlist.playlist_songs.indexOf(req.params.song_id);
        if (index !== -1) { playlist.playlist_songs.splice(index, 1) }

        const newPlaylist = await Playlist.findByIdAndUpdate(
            req.params.playlist_id,
            playlist,
            { new: true }
        )
        return res.json({ msage: 'Cancion Eliminada de la PLaylist-album', data: newPlaylist })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.playlist_id);
        return res.json({ msage: 'Playlist-album Eliminado', data: playlist });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

module.exports = {
    getAllPlaylistsAlbums, getAllPlaylistAlbumsByUsername, getPlaylistByNameUsingUsername, getPlaylistSongsByNameUsingUsername,
    getPlaylistById, getPlaylistSongsById, createNewPlaylist, updatePlaylistById, addSongsToThePlaylist,
    deleteSongsFromThePlaylist, deletePlaylist,getAllPlaylistByUsername,getAllAlbumsByUsername,
};


