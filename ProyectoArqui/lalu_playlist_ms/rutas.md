GET /lalu/playlists/username/:username
Recuperar todas las playlists del usuario indicado

GET /lalu/playlists/username/:username/:playlist_name
Recuperar la playlist del usuario con el nombre indicado 

GET /lalu/playlists/username/:username/:playlist_name/songs
Recuperar las canciones de la playlist del usuario con el nombre indicado 

GET /lalu/playlists
Recuperar todas las playlists 

GET /lalu/playlists/id/:playlist_id
Recuperar la playlist con el id ingresado

GET /lalu/playlists/id/:playlist_id/songs
Recuperar las canciones de la playlist con el id ingresado

POST /lalu/playlists
Crear una playlist

PUT /lalu/playlists/playlistId
Actualizar una Playlist

Delete /lalu/playlists/playlistId
Borra una Playlist