var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Song = require('./app/models/Song')

// Configure app for bodyParser()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Set up port for server
var port = process.env.PORT || 3000

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/song')

// API Routes
var router = express.Router()

app.use('/api', router)

// Middleware
router.use(function (req, res, next) {
    console.log('...There is some processing currently going down...')
    next()
})

// Test Route
router.get('/', function (req, res) {
    res.json({message: 'Welcome to Song API!'})
})


router.route('/song')
    .post(function (req, res) {
        var song = new Song()
        song.artist = req.body.artist
        song.albums = req.body.albums
        song.years = req.body.years
        song.title = req.body.title

        song.save(function (err) {
            if (err) {
                res.send(err)
            }
            res.json({message: 'Song was successfully manufacture'})
        })
    })

    .get(function (req, res) {
        Song.find(function (err, song) {
            if (err) {
                res.send(err)
            }
            res.json(song)
        })
    })

    router.route('/song/:song_id')
        .get(function (req, res) {
            Song.findById(req.params.song_id, function (err, song) {
                if (err) {
                    res.send(err)
                }
                res.json(song)
            })
        })

    router.route('/song/artist/:artist')
        .get(function (req, res) {
            Song.find({artist:req.params.artist}, function (err, song) {
                if (err) {
                    res.send(err)
                }
                res.json(song)
            })
        })

    router.route('/song/albums/:albums')
        .get(function (req, res) {
            Song.find({albums:req.params.albums}, function (err, song) {
                if (err) {
                    res.send(err)
                }
                res.json(song)
            })
        })

    router.route('/song/years/:years')
    .get(function (req, res) {
        Song.find({years:req.params.years}, function (err, song) {
            if (err) {
                res.send(err)
            }
            res.json(song)
        })
    })

    router.route('/song/title/:title')
    .get(function (req, res) {
        Song.find({title:req.params.title}, function (err, song) {
            if (err) {
                res.send(err)
            }
            res.json(song)
        })
    })

// Fire up server
app.listen(port)
console.log('Server running on port ' + port)