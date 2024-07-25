const userModel = require('../models/user')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
    login: (req, res) => {
        res.render('login', {req})
    },
    handleLogin: (req, res) => {
        const {username, password} = req.body
        if(!username || !password){
            req.flash('errorMessage', '該填的沒填')  
            return  res.redirect('back')
        }
        userModel.get(username, (err, user) => {
            if(err || !user){
                req.flash('errorMessage', '帳號密碼錯誤')  
                return  res.redirect('back')
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if(err || !result){
                    req.flash('errorMessage', '帳號密碼錯誤')  
                    return  res.redirect('back')
                }
                req.session.username = user.username
                res.redirect('/')
            });
        })
        
    },
    logout: (req, res) => {
        req.session.username = null
        res.redirect('/')
    },
    register: (req, res) => {
        res.render('register', {req})
    },
    handleRegister: (req, res) => {
        const {username, password, nickname} = req.body
        if(!username || !password || !nickname){
            req.flash('errorMessage', '缺少必要欄位')
            return res.redirect('back')
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){ 
                return req.flash('errorMessage', err.toString())
            }
        userModel.add({
            username,
            password: hash,
            nickname
        }, (err) => {
            if(err){ 
                req.flash('errorMessage', '輸入錯誤')
                return res.redirect('back')
            }
        })
        req.session.username = username
        res.redirect('/')
        });
    }

}

module.exports = userController