const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config(); // to activate and configure process.env

const Person = require("./models/phonebook");

const app = express();

app.use(express.json());
app.use(cors()); // allows cross origin requests
app.use(express.static("dist")); // serves static files

/* Logs the data sent in HTTP post requests*/

morgan.token("body", (request,response) => {
  if(request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return;
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": 5,
      "name": "John Doe", 
      "number": "39-23-6424783"
    }
]

const generateId = () => {
  return Math.floor(Math.random() * 10000000);
}

app.get("/", (request,response) => {
    response.send("<h1>Phonebook Backend</h1>")
}) 

app.get("/api/persons", (request,response) => {
    // response.json(persons);

    Person.find({})
    .then(persons => {
      if(persons) {
        response.status(200).json(persons);
      }
      else {
        response.status(404).json({
          error: "Phone Book details not found..."
        });
      }
    })
    .catch(error => {
      response.status(500).end();
    })
})

app.get("/info", (request,response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>
    `)
}) 

app.get("/api/persons/:id", (request,response) => {
  const id = Number(request.params.id);

  const phoneInfo = persons.find(person => person.id === id);

  if(phoneInfo) {
    response.json(phoneInfo);
  }
  else {
    response.status(404).end();
  }
})

app.delete("/api/persons/:id", (request, response, next) => {

  /*
  const id = Number(request.params.id);

  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
  */

  const id = request.params.id;

  Person.findByIdAndDelete(id)
  .then(() => {
    response.status(204).end();
  })
  .catch(error => next(error)) 
})

app.post("/api/persons", (request,response) => {
  const person = request.body; 

  if(!person.name) {
    return response.status(400).json({
      error: "Name is missing"
    })
  }

  if(!person.number) {
    return response.status(400).json({
      error: "Number is missing"
    })
  }

  const isPerson = persons.find(entry => entry.name === person.name);

  if(isPerson) {
    return response.status(400).json({
      error: "Name must be unique"
    })
  }

  /* 
  const personIdObject = {id: generateId(), ...person};

  persons = persons.concat(personIdObject);

  response.status(201).json(personIdObject);
  */

  const personIdObject = new Person({
    name: person.name,
    number: person.number
  })

  personIdObject.save()
  .then(person => {
    response.status(201).json(person);
  })
  .catch(error => {
    response.status(500).end();
  })

})

app.put("/api/persons/:id", (request, response, next) => {

  const id = request.params.id;
  const newPerson = request.body;

  const updatedPerson = {
    name: newPerson.name,
    number: newPerson.number
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
  .then(person => {
    response.status(200).json(person);
  })
  .catch(error => next(error))

})

const unknownEndpoint = (request,response) => {
  response.status(404).json({
    error: "Unknown endpoint"
  })
}

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if(error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})