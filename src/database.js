const   mysql  =  require('mysql')
const {database } = require('./key.js')
const { promisify }= require('util');


const pool = mysql.createPool(database)

pool.getConnection((err, conexion)=> {
   if(err){
       if(err.code ==='PROTOCOL_CONNECTION_LOST'){
        console.error('database connection close')
        }
       if (err.code === 'ER_CON_COUNT_ERROR') {
         console.error('Database has to many connections');
       }
       if (err.code === 'ECONNREFUSED') {
         console.error('Database connection was refused');
       }

   }
    

     if(conexion) {
        conexion.release();
        console.log("db is connected"); 
     }
      return;

})

pool.query = promisify(pool.query);


module.exports = pool;