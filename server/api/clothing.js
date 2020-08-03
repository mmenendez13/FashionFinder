var sqlite3 = require('sqlite3').verbose();

exports.addItem = function(req,res,next) {

    let db = new sqlite3.Database('./db/main.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    //If not already in database
    let itemInfo = req.body;
    let insertSQL = ['INSERT INTO clothing(', Object.keys(itemInfo).join(','),') VALUES(?, ?, ?, ?, ?, ?, ?)'].join('');

    console.log(insertSQL);
    // console.log(values);

    db.run(insertSQL, Object.values(itemInfo), function(err) {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    });       
    db.close();
};

exports.getAllItems = function(req,res,next) {

    let db = new sqlite3.Database('./db/main.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    var userId = req.body.userId;
    var itemClass = req.body.itemClass;

    var sql = `SELECT itemType itemType,
        description description,
        clothinId clothingId,
        plaid plaid,
        stripes stripes
        FROM clothing
        WHERE ownerId = ? AND itemClass = ?
        ORDER BY itemType`;

    db.all(sql, [userId, itemClass], (err, rows) => {
        if (err) {
            console.log(err.message)
              res.status(400).json({"error":err.message});
              return;
        }

        res.send({
            "message": "success",
            "data": rows
        });
    });

    db.close();

}


    // var params = ['USA'];





//Delete a thing 

//     db.run(`DELETE FROM users WHERE rowid=?`, 2, function(err) {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log(`Row(s) deleted ${this.changes}`);
// });
