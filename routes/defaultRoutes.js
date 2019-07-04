const router = require('express').Router()
const bcrypt = require('bcryptjs')

/* home page */
router.get('/', (req,res) =>{
    res.render('home', { title: "passport-local" })
})

/* login page */
router.get('/login', (req,res) =>{
    res.render('login', { title: "login page" })
})

/* process login */

/* register page */
router.get('/register', (req,res) =>{
    res.render('register', { title: "register page" })
})

/* process register */


module.exports = router