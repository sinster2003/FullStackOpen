const { MONGO_URI } = require('../utils/config');
const logger = require("../utils/logger");
const mongoose = require('mongoose');

const connectDb = () => {
    const mongoUrl = MONGO_URI;
    mongoose.connect(mongoUrl)
    .then(() => {
        logger.info(`Mongodb connected at ${mongoose.connection.host}`);
    })    
    .catch((error) => {
        logger.info(`Mongodb could not connect ${error}`);
    })
}

module.exports = connectDb;