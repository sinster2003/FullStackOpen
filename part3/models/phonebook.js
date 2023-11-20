require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI);

// schema
const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

// modifying the data sent to the client side
phoneSchema.set("toJSON", {
    transform: (document, reqObject) => {

        reqObject.id = reqObject._id.toString();

        delete reqObject._id;
    }
})

// model
const Person = mongoose.model("Person", phoneSchema);

module.exports = Person;