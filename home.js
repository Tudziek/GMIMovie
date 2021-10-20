var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    let select = 'SELECT imdbID imdbID, moviePlot, movieRelease, movieTitle, movieWriter, posterURL from Movies';

    con.query(select, function (err, result) {
        if (err) 
            throw err;
        res.render('movieList.html', {
            result: result,
            info : ""
        })
    })
    
})

  
  module.exports = router;