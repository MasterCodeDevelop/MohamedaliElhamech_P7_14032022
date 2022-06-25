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
        const req = 'SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName, likes FROM posts JOIN users ON user_id = users.id';
        db.query(req, (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
    static get (id, cb) {
        const req = 'SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName FROM posts JOIN users ON user_id = users.id AND posts.id = '+id;
        db.query(req, (err, row)=>{
            if (err) throw err
            cb(row[0])
        })
        
    }
    static getAllByUserId (id, cb) {
        const req = 'SELECT posts.*,users.id as user_id, users.avatar, users.name, users.familyName FROM posts JOIN users ON user_id = users.id AND user_id ='+id;
        db.query(req, (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
    static delete (id, cb) {

        const req = 'DELETE FROM posts WHERE id = '+id;
        db.query(req, (err)=>{
            if (err) throw err
            cb()
        })
    }
    static update (SET, WHERE, cb) {
        db.query('UPDATE `posts` SET ? WHERE ?', [ SET, WHERE] , (err, row) => {
            if (err) throw err
            cb()
        })
    }

    static like ({id,likes}, cb) {
        //db.query('INSERT INTO posts SET ?', {content, imageUrl, user_id, createdAt: new Date().getTime()}, (err, result)=>{
        
        db.query('UPDATE  posts SET likes = ?  WHERE id = ?', [ `[ ${likes} ]` , id], (error, results, fields) => {
            cb(error);
        });

        /*db.query("UPDATE posts SET ?", {likes: "["+likes+"]"}, (err) => {
            if (err) throw err
            cb()
        })*/
    }
    /*
    static update ({id, title, description}, cb) {

        var set = '';
        if(title){set+= 'title = "'+title+'", '}
        if(description){set+= 'description = "'+description+'", '}
        set = set.slice(0, set.length-3)+'"'


        const sql_update = 'UPDATE posts set '+set+' WHERE id = "'+id+'"'

        db.query(sql_update, (err)=>{
            if (err) throw err
            cb()
        })
    }*/
}

module.exports = Post