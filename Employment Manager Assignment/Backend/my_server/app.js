var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ijse',
    database: 'employment_manager',
    multipleStatement: true
});

mysqlConnection.connect(function(error){
    if(!error) {
        console.log('DB Connection Succeded');
    } else {
        console.log('DB Connection Faild \n Error : ');
    }
});

app.listen(3000,function () {
    console.log('Express Server is running at port no : 3000')
});

// origin
app.use(function(req, res, next){
    var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
    var origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
//res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});


// Get an Employment
app.get('/employment', function (req, res) {
   mysqlConnection.query('SELECT * FROM employment', function (err, rows, field) {
       if (!err) {
           res.send(rows);
       }else {
           res.send(err);
       }
   })
});

// Delete an Employment
app.delete('/employment/:id', function (req, res) {
    mysqlConnection.query('DELETE FROM employment WHERE employment_id = ?',
        [req.params.id], function (err, rows, field) {
        if (!err) {
            res.send('Deleted successfully')
        }else {
            res.send(err);
        }
    })
});

// Insert an Employment
app.post('/employment', function (req, res) {
    var emp = req.body;
    var sql = "INSERT INTO employment(company , city , country , title , peried_month , peried_year , through_month , through_year , currently_work , description ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    mysqlConnection.query(
        sql,
        [emp.company, emp.city, emp.country, emp.title,
            emp.periedMonth, emp.periedYear, emp.throughMonth, emp.throughYear,
            emp.currentlyWork, emp.description ],
        function (err, rows, field) {
        if (!err) {
            res.send('Success')
        }else {
            res.send(err);
        }
    })
});


