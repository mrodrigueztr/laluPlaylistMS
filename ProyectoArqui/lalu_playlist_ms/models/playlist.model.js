const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    playlist_username : {
        type : String, 
        require : true
    },
    playlist_name : {
        type: String , 
        required : true 
    },
    playlist_description : {
        type : String
    },
    playlist_privacity :{
        type : Boolean, 
        require : true
    },
    playlist_cover : {
        type: String
    } ,
    playlist_songs : {
        type : [mongoose.ObjectId]
    }
},{
    timestamps : true
});

module.exports = mongoose.model('playlist',playlistSchema);