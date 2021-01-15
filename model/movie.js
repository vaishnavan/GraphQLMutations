const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieName:{
        type:String,
    },
    hero:{
        type:String,
    },
    director:{
        type:String,
    },
})

module.exports = mongoose.model('Movie', movieSchema);