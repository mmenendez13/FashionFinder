var sqlite3 = require('sqlite3').verbose();

exports.signIn = function(req,res,next) {
 
	//Initialize the database
	let db = new sqlite3.Database('./db/main.db', (err) => {
	    if (err) {
	        console.error(err.message);
	    }
	});

    //Define SQL statement
    alreadyIn = 'SELECT NOT EXISTS(SELECT * FROM users WHERE userId=?)';

    db.serialize(() => {
        db.all(alreadyIn, req.body.sub, function(err, rows) {
            if (err) {
                return console.log(err.message);
            } else {
            	//If not already in database
                if(Object.values(rows[0])[0]) { 
                	console.log('Adding user')
                    insertSQL = 'INSERT INTO users(userId, name, email) VALUES(?, ?, ?)';

                    userInfo = [req.body.sub, req.body.name, req.body.email];

                    db.run(insertSQL, userInfo, function(err) {
                        if (err) {
                            return console.log(err.message);
                        }
                        console.log(`A row has been inserted with rowid ${this.lastID}`);
                    });

                } else {
                    console.log([req.body.name, ' has signed in.'].join(''));
                }
            };
        }).all('SELECT clothingClasses FROM users WHERE userId=?', req.body.sub, function(err, rows) {
            if (err) {
                console.log(err.message)
            } else {
                console.log(rows[0])
                res.send({
                    'message': 'success',
                    'data': rows[0]
                });
            }
        });
    });

    db.close();
};