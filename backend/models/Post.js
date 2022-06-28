let db = require('../db/mysql');


class Post {
    static create (SET, cb) {
        db.query('INSERT INTO posts SET ?', SET, (err, result)=>{
            if(err) throw err
            db.query('SELECT @@IDENTITY', (err, result)=>{
                if(err) throw err
                cb(result[0]['@@IDENTITY'])
            })
        })
    }
    static all (cb) {
        const req = 'SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName FROM posts JOIN users ON user_id = users.id';
        db.query(req, (err, rows)=>{
            if (err) throw err;
            cb(rows);
        })
    }
    static get (id, cb) {
        db.query('SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName FROM posts JOIN users ON user_id = users.id AND posts.id = ?', id ,  (err, row)=>{
            if (err) throw err;
            cb(row);
        })
        
    }
    static getAllByUserId (id, cb) {
        db.query('SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName FROM posts JOIN users ON user_id = users.id AND user_id = ?', id, (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
    static delete (id, cb) {

        db.query('DELETE FROM posts WHERE id = ?', id,  (err)=>{
            if (err) throw err
            cb()
        })
    }
    static update (SET, WHERE, cb) {
        db.query('UPDATE `posts` SET ? WHERE ?', [ SET, WHERE] , (err) => {
            if (err) throw err
            cb()
        })
    }

    static like ({id,likes}, cb) {        
        db.query('UPDATE  posts SET likes = ?  WHERE id = ?', [ `[ ${likes} ]` , id], (error, results, fields) => {
            cb(error);
        });
    }
}

module.exports = Post