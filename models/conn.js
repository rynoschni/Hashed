const host = "lallah.db.elephantsql.com",
    user = "jesbsetp",
    database = "jesbsetp",
    password = "o1JH2MXV8qk_Hgwa0oAxMLMN74zzQu1q";

const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY: ', e.query)
    }
});

const options = {
    host: host,
    database: database,
    user: user,
    password: password
}

const db = pgp(options)

module.exports = db;