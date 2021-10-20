var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    let select = `select Comments.imdbID imdbID, Comments.comment comment, Movies.movieTitle, Movies.posterURL 
    from Comments 
    Left join Movies on 
    Movies.imdbID = Comments.imdbID`;

    con.query(select, function (err, result) {
        if (err) 
            throw err;
        res.render('commentList.html', {
            result: result,
            info : ""
        })
    })
    
})

  
  module.exports = router;