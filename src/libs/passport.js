const passport = require('passport')
const LocalStrategy =require('passport-local').Strategy;
const pool = require('../database.js')
const helpers = require('./helpers.js')

passport.use('local-signin', new LocalStrategy({
      usernameField:'username',
      passwordField:'password',
      passReqToCallback:true
}, async(req, username, password, done)=>{
       
    const row = await pool.query("SELECT * FROM users WHERE username =?",[username])
    if(row.length > 0){
          user = row[0]
      const valuePassword = await helpers.comparePassword(password, user.password)
      if(valuePassword){
            done(null, user, req.flash('success','welcome '+  user.username))
      }else {

            done(null, false , req.flash('message','incorrect password '))
      }
    }else {

      return done(null, false, req.flash('message','el username not found'))
    }


}))





passport.use('local-signup', new LocalStrategy({
      usernameField:'username',
      passwordField:'password',
      passReqToCallback: true
}, async (req, username, password, done) => {
     const {fullname} = req.body
     const  newUser = {
        fullname : fullname,
        username : username,
        password : password
     }
     newUser. password = await  helpers.encryptPassword(password)
    const result = await pool.query("INSERT INTO users SET ?",[newUser])
     newUser.id = result.insertId
     done(null, newUser);
}))


passport.serializeUser((user, done)=> {
    done(null, user.id)
})

passport.deserializeUser( async (id, done)=> {
    const row = await pool.query("SELECT * FROM users WHERE id=?",[id])
    done(null, row[0])
})