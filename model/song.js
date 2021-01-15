const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    song:{
        type:String,
    },
    movieId:{
        type:String,
    },
})

module.exports = mongoose.model('Song', songSchema);