const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const passport = require('passport')

router.get('/login', (req,res,next) =>{
    if (req.user) {
        res.redirect('/dashboard')
    }
    next()
})

router.get('/register', (req,res,next) =>{
    if (req.user) {
        res.redirect('/dashboard')
    }
    next()
})


/* home page */
router.get('/', (req,res) =>{
    res.render('home', { title: "passport-local" })
})

/* login page */
router.get('/login', (req,res) =>{
    res.render('login', { title: "login page" })
})

/* process login */
router.post('/login', (req,res,next) =>{
    passport.authenticate('local', {
        successRedirect: 'dashboard',
        failureRedirect: 'login',
        failureFlash: true
    })(req,res,next)
})

/* register page */
router.get('/register', (req,res) =>{
    res.render('register', { title: "register page" })
})

/* process register */
router.post('/register', (req,res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.pass
    const rePass = req.body.repass

    req.checkBody('username', 'username is required').notEmpty()
    req.checkBody('email', 'email is not valid').isEmail()
    req.checkBody('pass', 'password is required.').notEmpty().isLength({min: 5}).withMessage('password must be great than 5 chars.')
    req.checkBody('repass', 'password not much').equals(req.body.pass)

    const errors = req.validationErrors()

    if(errors) {
        req.flash('error', errors)
        res.render('register', {title: 'register page', errors: errors})
    } else {
        const newUser = new User({
            username,
            email,
            password
        })

        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if (err) { console.log(err) }
                newUser.password = hash
                newUser.save((err) => {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        req.flash('sucess', 'user saved to database')
                        res.redirect('/login')
                    }
                })
            })
            
        })
    }

})

module.exports = router