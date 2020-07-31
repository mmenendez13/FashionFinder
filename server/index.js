
//Run the actual app
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();
 
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

//Initialize the database
var sqlite3 = require('sqlite3').verbose();
 
let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the example database.');
});


//Define a sample get request
app.get('/whatever', (req, res, next) => {
    
    var sql = `SELECT FirstName firstName,
            LastName lastName,
            Email email
            FROM customers
            WHERE Country = ?
            ORDER BY FirstName`;
    var params = ['USA'];

    db.all(sql, ['USA'], (err, rows) => {
        if (err) {
              res.status(400).json({"error":err.message});
              return;
        }

	    res.json({
	        "message": "success",
	        "data": rows
	    });
    });
});

app.post('/newItem', (req, res, next) => {
    console.log(req.body)
    // var sql = `SELECT FirstName firstName,
    //         LastName lastName,
    //         Email email
    //         FROM customers
    //         WHERE Country = ?
    //         ORDER BY FirstName`;
    // var params = ['USA'];

    // db.all(sql, ['USA'], (err, rows) => {
    //     if (err) {
    //           res.status(400).json({"error":err.message});
    //           return;
    //     }

    //     res.json({
    //         "message": "success",
    //         "data": rows
    //     });
    // });
});


 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});