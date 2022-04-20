const request = require('supertest');
const mongoose =  require('mongoose');
const app = require('../../laluPlaylist');
const Playlist = require('../../models/playlist.model');


describe('Pruebas sobre la API de laluPlaylist',() =>{
    beforeAll(async ()=>{
        await mongoose.connect('mongodb+srv://mrodrigueztr:prueba@api-rest.ty8tf.mongodb.net/laluPlaylistsDb?retryWrites=true&w=majority');
    });

    afterAll(async ()=>{
        await mongoose.disconnect();
    });

    describe('GET /lalu/playlists' , () => {

        let response;
        beforeEach(async ()=>{
            response = await request(app).get('/lalu/playlists').send();
        });

        it('La ruta funciona', async ()=>{
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('La peticion nos devuelve un Objeto con las playlists',async () =>{
            expect(response.body).toBeInstanceOf(Object);
        });
    });
    describe('GET /lalu/playlists/playlist_id', () => {

        let playlist;
        let response;
        beforeEach( async () => {
            playlist = await Playlist.create({ playlist_name : 'test playlist',playlist_description : 
            'test description',playlist_creator : 3 , playlist_privacity : true , playlist_cover : 
            'prueba cover',playlist_songs : ["625b82ed7ee7284dac86e6d5","625b874eb85a9f8e141a6372","625b875e635d64214d25fefc"]});
            
            response = await request(app).post(`/lalu/playlists/${playlist._id}`).send(playlist);
            response = await request(app).get(`/lalu/playlists/${playlist._id}`).send();

        });

        afterEach(async () => {
            await Playlist.findByIdAndDelete(playlist._id);
        });
        
        it('Ruta funciona', async () =>{
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });
        /*it('La peticion nos devuelve un Objeto con la id de playlist ingresada',async () =>{
            
            expect(response.body.data._id).toBeDefined();
            expect(response.body.data._id).toBe(body.data.playlist);
        });*/
    });
    describe('POST /lalu/playlists', () => {
        
        const newPlaylist = { playlist_name : 'test playlist',playlist_description : 
        'test description',playlist_creator : 2 , playlist_privacity : false , playlist_cover : 
        'prueba cover', playlist_songs : ["625b82ed7ee7284dac86e6d5","625b874eb85a9f8e141a6372","625b875e635d64214d25fefc"]};

        const wrongPlaylist = { nombre : 'test trip'};

        afterAll(async() => {
            await Playlist.deleteMany({playlist_name : 'test playlist'});
        });
        
        
        it('La ruta funcione',async () =>{
            const response = await request(app).post('/lalu/playlists').send(newPlaylist);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        })

        it('Se inserta correctamente un registro Playlist', async () => {
            const response = await request(app).post('/lalu/playlists').send(newPlaylist);

            expect(response.body.data._id).toBeDefined();
            expect(response.body.data.playlist_name).toBe(newPlaylist.playlist_name);
        })

        it('No se inserta correctamente un registro Playlist' , async () =>{
            const response = await request(app).post('/lalu/playlists').send(wrongPlaylist);

            expect(response.status).toBe(500);
            expect(response.body.error).toBeDefined();

        });
    });
    describe('PUT /lalu/playlists', () =>{
        
        let playlist;
        beforeEach( async () => {
            playlist = await Playlist.create({ playlist_name : 'test playlist',playlist_description : 
            'test description',playlist_creator : 3 , playlist_privacity : true , playlist_cover : 
            'prueba cover',playlist_songs : ["625b82ed7ee7284dac86e6d5","625b874eb85a9f8e141a6372","625b875e635d64214d25fefc"]});
        });

        afterEach(async () => {
            await Playlist.findByIdAndDelete(playlist._id);
        });

        it('Ruta funciona', async () =>{
            const response = await request(app).put(`/lalu/playlists/${playlist._id}`).send({
                playlist_name : 'playlist Updating'
            });

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Se actualiza correctamente', async () => {
            const response = await request(app).put(`/lalu/playlists/${playlist._id}`).send({
                playlist_name : 'playlist Updating'
            });

            expect(response.body.data._id).toBeDefined();
            expect(response.body.data.playlist_name).toBe('playlist Updating');
        });
    });
    describe('DELETE /lalu/playlists' , () =>{

        let playlist;
        let response;

        beforeEach( async () => {
            playlist = await Playlist.create({ playlist_name : 'test playlist',playlist_description : 
            'test description',playlist_creator : 3 , playlist_privacity : true , playlist_cover : 
            'prueba cover',playlist_songs : ["625b82ed7ee7284dac86e6d5","625b874eb85a9f8e141a6372","625b875e635d64214d25fefc"]});
            response = await request(app).delete(`/lalu/playlists/${playlist._id}`).send();
        });

        it('La direccion funciona', () => {
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        it('Borra correctamente playlist', async () =>{
            expect(response.body.data._id).toBeDefined();

            const foundPlaylist =  await Playlist.findById(playlist._id);
            expect(foundPlaylist).toBeNull();
        });

    });
});