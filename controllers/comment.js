const commentModel = require('../models/comment')

const commentController = {
    getAll: (req, res) => {
        commentModel.getAll((err, results) => {
            if(err) return console.log(err)
            res.render('comments', {
                comments: results,
                req
            })
        })
    },

    newTodo: (req,res) => {
        const content = req.body.content
        const username = req.session.username
        const createdAt = new Date();
        if(username && !content){
            req.flash('errorMessage', '請輸入新增內容')
            return res.redirect('back')
        }
        if(!content){
            req.flash('errorMessage', '尚未登入')
            return res.redirect('back')
        }
        commentModel.add(content, username, createdAt, (err) => {
            if(err) return console.log(err)
            res.redirect('/')
        })
    },

    delete: (req, res) => {
        commentModel.delete(req.params.id, req.session.username, (err) => {
            if(err) return console.log(err)
            res.redirect('/')
        })
    },
    update: (req, res) => {
        commentModel.get(req.params.id, (err, results) => {
            if(err) return console.log(err)
            res.render('update', {
                comment: results,
                req
            })
        })
    },

    handleUpdate: (req, res) => {
        const content = req.body.content
        const id = req.params.id
        const username = req.session.username
        const createdAt = new Date()
        commentModel.update(content, id, username, createdAt, (err) => {
            if(err) return console.log(err)
            res.redirect('/')
        })
    },
}

module.exports = commentController