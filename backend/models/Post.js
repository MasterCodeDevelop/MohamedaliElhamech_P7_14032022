let connection = require('../config/db');


class Post {
    static create ({title, description, imageUrl}, cb) {

        var set = '';
        if(title){set+= 'title = "'+title+'", '}
        if(description){set+= 'description = "'+description+'", '}
        if(imageUrl){set+= 'imageUrl = "'+imageUrl+'", '}
        set = set.slice(0, set.length-3)+'"'

        connection.query('INSERT INTO posts SET '+set+' ', (err, result)=>{
            if(err) throw err
            cb(result)
        })
    }
    static all (cb) {
        connection.query('SELECT * FROM posts', (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
    static get (id, cb) {
        connection.query('SELECT * FROM posts WHERE id = "'+id+'"', (err, row)=>{
            if (err) throw err
            cb(row[0])
        })
    }
    static delete (id, cb) {
        connection.query('DELETE FROM posts WHERE id = "'+id+'"', (err)=>{
            if (err) throw err
            cb()
        })
    }
    static update (id, {title, description}, cb) {

        var set = '';
        if(title){set+= 'title = "'+title+'", '}
        if(description){set+= 'description = "'+description+'", '}
        set = set.slice(0, set.length-3)+'"'


        const sql_update = 'UPDATE posts set '+set+' WHERE id = "'+id+'"'

        connection.query(sql_update, (err)=>{
            if (err) throw err
            cb()
        })
    }
}

module.exports = Post