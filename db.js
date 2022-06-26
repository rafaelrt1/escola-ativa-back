const connection = require('./config/connectDb');

async function findUser(username) {
    console.log(username);
    // const conn = await connect();
    console.log("username: ",username);
    connection.query("SELECT * FROM usuario WHERE loginUsu=? LIMIT 1;", username, function (err, rows, fields) {
        console.log(rows[0])
        if (rows.length > 0)
            return rows[0];
        else return null;
    }).end;
}

async function findUserById(id) {
    console.log(id);
    // const conn = await connect();
    console.log("id: ",id);
    connection.query("SELECT * FROM usuario WHERE idUsu=? LIMIT 1;", id, function (err, rows, fields) {
        console.log(rows[0])
        if (rows.length > 0)
            return rows[0];
        else return null;
    }).end;
}

module.exports = { findUser, findUserById }