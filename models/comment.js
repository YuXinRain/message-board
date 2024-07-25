const db = require('../db')

const commentModel = {
    getAll: cb => {
        db.query(
            `SELECT U.nickname, C.content, C.id, C.username, C.createdAt
            FROM comments as C
            LEFT JOIN users as U on U.username = C.username
            ORDER BY C.id DESC`,
            (err, results) => { 
                if(err) return cb(err)
                cb(null, results)
            }
        )
    },
    get: (id, cb)  => {
        db.query(
            `SELECT U.nickname, C.content, C.id, C.username
            FROM comments as C
            LEFT JOIN users as U on U.username = C.username
            WHERE C.id = ?`,[id],
            (err, results) => { 
                if(err) return cb(err)
                cb(null, results[0])
            }
        )
    },
    add: (content, username, createdAt, cb) => {
        db.query(
            'insert into comments(content, username, createdAt) values(?, ?, ?)', 
            [content, username, createdAt], 
            (err, results) => {
            if (err) return cb(err);
            cb(null)
          });
    },
    delete: (id, username, cb) => {
        db.query(
            'DELETE FROM comments where id=? and username=?', 
            [id, username], 
            (err, results) => {
            if (err) return cb(err);
            cb(null)
          });
    },
    update: (content, id, username, createdAt, cb) => {
        db.query(
            'UPDATE comments set content=?, createdAt=? where id=? and username=?', 
            [content, createdAt, id, username], 
            (err, results) => {
            if (err) return cb(err);
            cb(null)
          });
    }
}

module.exports = commentModel
