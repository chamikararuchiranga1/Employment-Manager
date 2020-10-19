var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');


router.get('/employment', function(req, res, next) {

    dbConn.query('SELECT * FROM employment',function(err,rows)     {

        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('books',{data:''});
        } else {
            // render to views/books/index.ejs
            res.render('books',{data:rows});
        }
    });
});