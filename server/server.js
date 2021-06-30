const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const { Router } = require('express');

const app = express();
const PORT = 5000;

const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});



app.get('/artist', (req, res) => {
    console.log(`In /artist GET`);
    let queryText = `SELECT * FROM artist ORDER BY "birthdate" DESC`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error', error);
            res.sendStatus(500);
        })

    //res.send(artistList);
});

app.post('/artist', (req, res) => {
    const newArtist = req.body;

    const queryText = `INSERT INTO artist ("name", "birthdate")
                        VALUES($1, $2);`;

    pool.query(queryText, [newArtist.name, newArtist.birthdate])
        .then(dbResponse => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('artist addition failed', error);
            res.sendStatus(500);
        });
    //artistList.push(req.body);
    //res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /song GET`);
    let queryText = `SELECT * FROM song ORDER BY "title"`;

    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error', error);
            res.sendStatus(500);
        })
});

app.post('/song', (req, res) => {
    const newSong = req.body;

    const queryText = `INSERT INTO song (title, length, released)
                        VALUES($1, $2, $3);`;

    pool.query(queryText, [newSong.title, newSong.length, newSong.released])
        .then(dbResponse => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log('song addition failed', error);
            res.sendStatus(500);
        });
    
    
    
    //songList.push(req.body);
    //res.sendStatus(201);
});


