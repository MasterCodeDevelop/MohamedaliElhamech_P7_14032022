let db = require('../db/mysql');

class Likes {
    static get( { userID, postID } , cb) {        
        db.query('SELECT *  FROM posts_likes WHERE user_id = ? AND post_id = ?' ,[ userID, postID ], (err, res) => {
            if(err) throw err;
            cb(res);
        });
    }
    static getAll( postID, cb ) {
        db.query('SELECT user_id FROM posts_likes WHERE post_id = ?', postID, (err, res) => {
            if (err) throw err;
            cb(res);
        })
    }
    static set ( { userID, postID } , cb) {
        db.query('INSERT INTO posts_likes SET user_id = ? , post_id = ?',[ userID, postID ], (err) => {
            if(err) throw err;
            cb();
        })
    }
    static delete( { userID, postID } , cb) {
        db.query('DELETE FROM posts_likes WHERE user_id = ? AND post_id = ?' ,[ userID, postID ], (err) => {
            if (err) throw err;
            cb();
        })
    }
}

module.exports = Likes