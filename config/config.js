require('dotenv').config()

module.exports = {
    port : process.env.PORT,
    database : {
        dbUri : process.env.DBURI
    }
}