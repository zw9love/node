/**
 * Created by zengwei on 2017/11/15
 */

let mysql = require('mysql');
let databaseData = {
    host: 'localhost',
    port: '3306',
    database: 'beeeyehced',
    user: 'root',
    password: '159357',
}

let {host,port,database,user,password} = databaseData


function connectDatabase(sql, successFn) {

    let connection = mysql.createConnection({
        host: host,
        port: port,
        database: database,
        user: user,
        password: password,
    });

    connection.connect();

    // let sql = `SELECT * FROM ${tableName}`;

    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        if (successFn) {
            successFn(result)
        }

    });

    connection.end();

}

exports = module.exports = connectDatabase