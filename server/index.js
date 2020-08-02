//Run the actual app
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
 
const app = express();

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

//Import aux files
var users = require('./api/users');
var clothing = require('./api/clothing')

//Define a sample get request
app.post('/signIn', users.signIn);
app.post('/newItem', clothing.addItem);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/chinook.db', (err) => {
    if (err) {
        console.error(err.message);
    }
});


