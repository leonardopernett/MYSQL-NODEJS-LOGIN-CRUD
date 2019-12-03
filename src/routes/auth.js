const {Router} = require('express')
const router = Router()
const passport = require('passport')

const {Islogeado, IsNologeado} = require('../libs/authenticated.js')

router.get('/signup', IsNologeado,(req,res)=>{
   res.render('auth/signup.hbs')  
})

router.post('/signup', passport.authenticate('local-signup',{
   successRedirect:'/profile',
   failureRedirect:'/signup',
   failureFlash:true,
    
 }))
   

 router.get('/signin',IsNologeado,(req,res)=>{
   res.render('auth/signin.hbs')  
})


router.post('/signin',(req,res, next)=>{
   passport.authenticate('local-signin',{
      successRedirect:'/profile',
      failureRedirect:'/signin',
      failureFlash:true, 
   })(req,res,next);
})

 router.get('/profile', Islogeado,(req,res)=>{
   res.render('profile/user.hbs')  
})

router.get('/logout',(req,res)=>{
   req.logOut()
   res.redirect('/signin')  
})


module.exports = router