var mysql2 = require('mysql2');
var connection = mysql2.createPool({
    host     : process.env.HOST,
    user     : process.env.UNAME,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
});  

module.exports = connection