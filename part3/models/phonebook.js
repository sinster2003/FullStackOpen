require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI);

// schema
const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: (value) => {
                return /^\d{2,3}-\d+$/.test(value)
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: true
    }
})

// modifying the data sent to the client side
phoneSchema.set("toJSON", {
    transform: (document, reqObject) => {

        reqObject.id = reqObject._id.toString();

        delete reqObject._id;
        delete reqObject.__v;
    }
})

// model
const Person = mongoose.model("Person", phoneSchema);

module.exports = Person;