const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject.password;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;