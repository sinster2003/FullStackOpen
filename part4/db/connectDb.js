const { MONGO_URI } = require('../utils/config');
const logger = require("../utils/logger");
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        logger.info(`Mongodb connected at ${mongoose.connection.host}`);   
    }
    catch {
        logger.error(`Mongodb could not connect ${error}`);
    }
}

module.exports = connectDb;