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

morgan.token("body", (request) => {
  if(request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return;
});

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

app.get("/", (request,response) => {
  response.send("<h1>Phonebook Backend</h1>");
});

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
    .catch(() => {
      response.status(500).end();
    });
});

app.get("/info", (request,response) => {

  Person.find({})
    .then(persons => {
      if(persons) {
        response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
      `);
      }
      else {
        response.status(404).json({ error: "Data not found" });
      }
    })
    .catch(() => {
      response.status(500).end();
    });
});

app.get("/api/persons/:id", (request, response, next) => {

  const id = request.params.id;

  Person.findById(id)
    .then(person => {
      if(person) {
        response.status(200).json(person);
      }
      else {
        response.status(404).json({ error: "Data not found" });
      }
    })
    .catch(error => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {

  const id = request.params.id;

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const person = request.body;

  if(!person.name) {
    return response.status(400).json({
      error: "Name is missing"
    });
  }

  if(!person.number) {
    return response.status(400).json({
      error: "Number is missing"
    });
  }

  const personIdObject = new Person({
    name: person.name,
    number: person.number
  });

  personIdObject.save()
    .then(person => {
      response.status(201).json(person);
    })
    .catch(error => next(error));

});

app.put("/api/persons/:id", (request, response, next) => {

  const id = request.params.id;
  const newPerson = request.body;

  const updatedPerson = {
    name: newPerson.name,
    number: newPerson.number
  };

  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: "query" })
    .then(person => {
      response.status(200).json(person);
    })
    .catch(error => next(error));

});

const unknownEndpoint = (request,response) => {
  response.status(404).json({
    error: "Unknown endpoint"
  });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if(error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }
  else if(error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});