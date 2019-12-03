const express = require('express')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const hbs     = require('express-handlebars')
const passport = require('passport')

const flash    = require('connect-flash')
const MysqlStore =require('express-mysql-session')

const {database} = require('./key.js')
const app = express()

require('./libs/passport.js')

//setting 
app.set('port', process.env.PORT|| 3000)
app.set('views',path.join(__dirname,'views'))
app.engine('hbs', hbs({
     
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:'./libs/helpers.js'

}))
app.set('view engine', hbs)


app.use(session({
    secret:'mysqlSessionNodejs',
    resave:false,
    saveUninitialized:false,
    store: new MysqlStore(database)
}))


//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res, next)=> {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.user    = req.user
  
    next()
})

//routes
app.use(require('./routes/index.js'))
app.use(require('./routes/auth.js'))
app.use('/links',require('./routes/links.js'))

//statuc
app.use(express.static(path.join(__dirname,'public')))

//listen 
app.listen(app.get('port'), ()=>{
      console.log('server on port ', app.get('port'))
})