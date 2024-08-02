const express = require('express')
const bodyParser = require('body-parser')
const commentController = require('./controllers/comment')
const userController = require('./controllers/user')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001

app.set('view engine', 'ejs')

app.use(express.static('views')) //傳入靜態資源 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use((req, res, next) => {
    res.locals.username = req.session.username || null
    res.locals.errorMessage = req.flash('errorMessage')
    next()
})

app.post('/', commentController.newTodo)
app.get('/',commentController.getAll)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister)
app.get('/delete_comment/:id', commentController.delete)
app.get('/update_comment/:id', commentController.update)
app.post('/update_comment/:id', commentController.handleUpdate)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})