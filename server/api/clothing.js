var sqlite3 = require('sqlite3').verbose();

exports.addItem = function(req,res,next) {

    let db = new sqlite3.Database('./db/main.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });


    //If not already in database
    let itemInfo = req.body;
    let insertSQL = ['INSERT INTO (', Object.keys(itemInfo).join(','),') VALUES(?, ?, ?, ?, ?, ?)'].join('');

    console.log(insertSQL);
    // console.log(values);

    if(Object.values(rows[0])[0]) { 

        db.run(insertSQL, Object.values(itemInfo), function(err) {
                if (err) {
                    return console.log(err.message);
            } else {
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            }
        });            
    }
    db.close();
};

exports.getAllItems = function(req,res,next) {

    var sql = `SELECT FirstName firstName,
            LastName lastName,
            Email email
            FROM shirt
            WHERE userId = ?`;

    db.all(sql, [], (err, rows) => {
        if (err) {
              res.status(400).json({"error":err.message});
              return;
        }

        res.json({
            "message": "success",
            "data": rows
        });
    });

}


    // var params = ['USA'];





//Delete a thing 

//     db.run(`DELETE FROM users WHERE rowid=?`, 2, function(err) {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(`Row(s) deleted ${this.changes}`);
// });
