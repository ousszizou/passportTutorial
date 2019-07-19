const express = require('express')
const mongoose = require('mongoose')
const { port, database } = require('./config/config')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const passport = require('passport')
const app = express()

// connect to database
mongoose.connect(database.dbUri, {useNewUrlParser: true})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log('connected to Database')
})

// Set view engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static('public'))

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// setup express-flash
app.use(flash())

// setup express-messages middleware
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res)
    next()
})

// setup express-validator middleware
app.use(expressValidator())

// session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// cookie-parser middleware
app.use(cookieParser())

// setup passport.js middleware
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.get('*', (req,res,next) =>{
    res.locals.user = req.user || null
    next()
})

// defines routes
const defaultRouter = require('./routes/defaultRoutes')
const dashboardRouter = require('./routes/authRoutes')

app.use('/', defaultRouter)
app.use('/dashboard', dashboardRouter)

// define 404 middlware (page not found)
app.use((req,res) => {
    res.status(404).send('page not found')
})

app.listen(port, ()=> console.log(`Server running on http://localhost:${port}`))