var sqlite3 = require('sqlite3').verbose();

exports.addItem = function(req,res,next) {

    //Initialize database
    let db = new sqlite3.Database('./db/main.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    //If not already in database
    let itemInfo = req.body;
    let insertSQL = ['INSERT INTO clothing(', Object.keys(itemInfo).join(','),') VALUES(?, ?, ?, ?, ?, ?, ?)'].join('');

    //Add clothing item to database
    db.run(insertSQL, Object.values(itemInfo), function(err) {
        if (err) {
            return console.log(err.message);
        } else {
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    });    
    
    //Close the database   
    db.close();
};

exports.getAllItems = function(req,res,next) {
    
    //Initialize database
    let db = new sqlite3.Database('./db/main.db', (err) => {
        if (err) {
            console.error(err.message);
        }
    });

    //Get important properties from request
    var userId = req.body.userId;
    var itemClass = req.body.itemClass;

    //SQL commands
    var sql = `SELECT itemType itemType,
        description description,
        clothingId clothingId,
        plaid plaid,
        stripes stripes
        FROM clothing
        WHERE ownerId = ? AND itemClass = ?
        ORDER BY itemType`;

    //Return all clothing in correct clothing class owned by user
    db.all(sql, [userId, itemClass], (err, rows) => {
        if (err) {
            console.log(err.message)
              res.status(400).json({"error":err.message});
              return;
        }
        //Send rows back to client
        res.send({
            "message": "success",
            "data": rows
        });
    });

    //Close the database
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
