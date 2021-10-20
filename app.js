//Modules
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//OMDB api key : 4ff243bc

const home = require('./home');
const addMovie = require('./addMovie');
const commentMovie = require('./commentMovie');
const commentList = require('./commentList');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Database Connection

const con = mysql.createConnection({
    host: "remotemysql.com",
    user: "1LhdMf3DKu",
    password: "dmg4PDPJHh",
    database: "1LhdMf3DKu"
});

con.connect((err) => {
    if (err) {
        throw err;
    }
});

//Keep Database Connection Active

setInterval(function () {
    con.query('SELECT 1');
}, 5000);

global.con = con;

//http://www.omdbapi.com/?i=tt3896198&apikey=4ff243bc


app.use(express.static(__dirname + '/views'));

app.use('/home', home);
app.use('/add', addMovie);
app.use('/comment', commentMovie);
app.use('/commentlist', commentList);

//Home Site

app.get('/',(req, res) => {
    res.render('index.html');
});
app.post('/', (req,res) =>{

    
    let movieId = req.body.movieId;

    let select = `SELECT imdbID, moviePlot, movieRelease, movieTitle, movieWriter, posterURL from Movies where imdbID = "${movieId}" or movieTitle like "%${movieId}%"`

    con.query(select, function (err, result) {
        if (err) 
            throw err;
        res.render('movieList.html', {
            result: result,
            info : "Here are your Search Results: "
        })
    })
    
})

app.listen(port, () =>{
    //console.log(`port ${port}`);
})