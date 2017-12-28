var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SongSchema = new Schema ({
    artist: String,
    albums: String,
    years: String,
    title: String
})

module.exports = mongoose.model('Song', SongSchema)