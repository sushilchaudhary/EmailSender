const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'sushilproject',
    password: '123456',
    database: 'test_db'
});


connection.connect(function (error) {
    if (error)
        console.log(error);
    else
        console.log('Database Connected')

});

module.exports = connection;