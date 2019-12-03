const {Router} = require('express')
const router = Router()
const pool = require('../database')
const {Islogeado} = require('../libs/authenticated.js')



router.get('/',Islogeado,async(req,res)=>{
    const links =  await pool.query("SELECT * FROM links WHERE user_id=?",[req.user.id] )

      res.render('links/index.hbs',{links})
 })

router.get('/add',Islogeado, (req,res)=> {
    res.render('links/add.hbs')
})

router.post('/add',Islogeado, async (req,res)=> {
   const {title, url , description } =  req.body;
     const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
     }
     await pool.query('INSERT INTO links set ?', [newLink] )
     req.flash('success','link saved successfully')
     res.redirect('/links')
})

router.get('/delete/:id',Islogeado, async(req,res)=> {

    const  {id }  = req.params
    await pool.query("DELETE FROM links where id=?",[id])
    req.flash('success','link deleted ')
    res.redirect('/links')
})

router.get('/edit/:id',Islogeado, async(req,res)=> {
    const  {id}  = req.params
    const link = await pool.query("SELECT * FROM links WHERE id=?",[id])
    res.render('links/edit.hbs',{link: link[0]})
})

router.post('/update/:id',Islogeado, async (req,res)=>{
    const  {id}  = req.params
    const  {title, url , description}  = req.body 
    const newLink = {
         title,
         url,
         description
    }
    await pool.query("UPDATE links SET ? WHERE id=?",[newLink, id])
    req.flash('success','link update successfully')
    res.redirect('/links')
})
module.exports = router