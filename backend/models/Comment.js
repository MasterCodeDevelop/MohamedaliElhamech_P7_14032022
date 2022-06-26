let db = require('../db/mysql');

class PostComments {
    static create (SET, cb) {
        db.query('INSERT INTO posts_comments SET ?', SET, (err, result)=>{
            if(err) throw err
            db.query('SELECT @@IDENTITY', (err, result)=>{
                if(err) throw err
                cb(result[0]['@@IDENTITY'])
            })
        })
    }
    static update ({id, content, userID}, cb) {
        const req = "UPDATE posts_comments SET content ='"+content+"' WHERE id= "+id+" AND user_id= "+userID;
        db.query(req, (err)=>{
            if (err) throw err
            cb()
        })
   
    }
    static getAllByPostId (id, cb) {
        //const req = 'SELECT posts_comments.* ,users.id as user_id, users.avatar, users.name, users.familyName FROM posts_comments JOIN users ON user_id = users.id AND posts_comments.post_id = '+id;
        const req =`
            SELECT 
                posts_comments.* ,
                users.id as user_id, users.avatar, users.name, users.familyName,
                posts.id as post_id, posts.user_id as post_userId
            FROM posts_comments
            INNER JOIN users
                ON user_id = users.id
            INNER JOIN posts
                ON post_id = posts.id AND posts_comments.post_id = ${id}
        `;
        db.query(req, (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
    static getById (id, cb) {
        const req =`
            SELECT 
                posts_comments.* ,
                users.id as user_id, users.avatar, users.name, users.familyName,
                posts.id as post_id, posts.user_id as post_userId
            FROM posts_comments
            INNER JOIN users
                ON user_id = users.id
            INNER JOIN posts
                ON post_id = posts.id AND posts_comments.id = ${id}
        `;


        // posts.id as post_id, posts.user_id as post_userId
        db.query(req, (err, rows)=>{
            if (err) throw err
            cb(rows[0], err)
        })
    }
    static delete (id, cb) {

        db.query("DELETE FROM posts_comments WHERE id = ?", id , (err)=>{
            if (err) throw err
            cb(err)
        })
    }
}


module.exports = PostComments