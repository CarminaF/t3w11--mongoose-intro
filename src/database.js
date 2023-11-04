require('dotenv').config();

const mongoose = require('mongoose');


/**
 * Connect or create & connect to a database
 */
async function databaseConnect(){
    try {
        // DB connecion can take time eg if DB is in the cloud
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected");
    } catch(error) {
        console.warn(`databaseConnect failed to connect to db: \n${JSON.stringify(error)}`);
    }
}

module.exports = {
    databaseConnect
}