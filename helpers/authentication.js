module.exports = {
    isAuth: (req,res,next) =>{
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash('errorlogin', "Please, login first.")
        res.redirect('/login')
    }
}