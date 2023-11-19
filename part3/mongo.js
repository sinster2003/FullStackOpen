require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI);

if(process.argv.length < 3) {
    console.log("Command line parameters must be 3 at least in count. Enter your password")
    process.exit(1);
}

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", phonebookSchema);

if(process.argv[3] && process.argv[4]) {

    const personObject = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    personObject.save()
    .then(result => {
        console.log(`added ${result.name} number ${result.number} to the phonebook`);
        mongoose.connection.close();
    })
}
else {
    
    Person.find({})
    .then(result => {
        console.log("phonebook: ");
        result.forEach(item => {
            console.log(`${item.name} ${item.number}`);
        })

        mongoose.connection.close();
    })
}


