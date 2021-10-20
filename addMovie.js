var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
router.get('/', function(req, res) {
    
    res.render('addMovie.html');


    
  });
  
  // About page route
  router.post('/', function(req, res) {

    
    let imdbID = req.body.movieId;

    if(imdbID.startsWith("tt")){
 
    let url = `http://www.omdbapi.com/?i=${imdbID}&apikey=4ff243bc`;
   
    //Fetching Movie's data

    const get_data = async url => {
        try {
          const response = await fetch(url);
          const json = await response.json();

          //Movie info from Api

          let movieTitle = json.Title;
          let movieDate = json.DVD;
          let moviePoster = json.Poster;
          let movieId = json.imdbID;
          let moviePlot = json.Plot;
          let movieWriter = json.Writer;
          
          //Adding data to the Database

          con.query(`insert into Movies (imdbId, moviePlot, movieRelease, movieTitle, movieWriter, posterURL) values 
          (?,?,?,?,?,?)`,[movieId,moviePlot,movieDate,movieTitle,movieWriter,moviePoster], 
          function (error, results, fields) {
            if (error) throw error;
            //console.log('Dodano informacje o filmie!');
          });


        } catch (error) {
          console.log(error);
        }
      };
    
    get_data(url);
    res.render('addMovie.html', {info : "Success, Movie added to the Database"});
    } else{
      res.render('addMovie.html', {error : "Error : Please Insert correct imdbID"})
    }
    

    
  });
  
  module.exports = router;