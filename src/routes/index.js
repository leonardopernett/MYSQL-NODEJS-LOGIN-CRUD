const { Router } = require('express')
const router = Router()



router.get('/', (req,res,next)=> {
    res.render('index.hbs')
})



module.exports = router