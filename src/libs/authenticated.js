module.exports = {

     Islogeado(req,res,next){
         if(req.isAuthenticated()){
            return next();
         }
         else {res.redirect('/signin')}
     },

     IsNologeado(req,res,next){
        if(!req.isAuthenticated()){
           return next();
        }
        else { res.redirect('/profile')}
    }
}