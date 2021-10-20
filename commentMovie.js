var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

    let select = 'SELECT imdbID imdbID, moviePlot, movieRelease, movieTitle, movieWriter, posterURL from Movies';

    con.query(select, function (err, result) {
        if (err) 
            throw err;
        res.render('commentMovie.html', {
            result: result,
            info : ""
        })
    })
    
})
router.post('/', (req,res) =>{
    //console.log(req.body);
    let imdbID = req.body.imdbID;

    let select = `select imdbID, movieTitle from Movies where imdbID = "${imdbID}"`;

    con.query(select, function (err, result) {
        
        if (err) 
            throw err;
        res.render('commentMovie2.html', {
            result : result,
            "title" : result[0].movieTitle,
            "imdbID" : result[0].imdbID
        })
    })
})
router.post('/2', (req,res) =>{
   // console.log(req.body);

    let imdbID = req.body.imdbID;
    let comment = req.body.commentReview;

    con.query(`INSERT INTO Comments (comment, imdbID) values (?,?)`,[comment,imdbID], 
          function (error, results, fields) {
            if (error) throw error;
            res.render('commentMovie.html', {
                info : "The comment was added correctly "
            })
           // console.log('Comment added');
          });

})


  module.exports = router; 