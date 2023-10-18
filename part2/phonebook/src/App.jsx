import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getPhone, createPhone, deletePhone, updatePhone } from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getPhone()
    .then(res => setPersons(res))
  }, [])

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handleNumber = (event) => {
    setPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  }

  const handleDelete = (id) => {
    deletePhone(id)
    .then(setPersons(
      persons.filter(person => person.id !== id)
    ))
  }

  const handlePhone = (event) => {
    event.preventDefault();

    const personObject = {
      name : newName,
      phone: phoneNumber,
      id: persons.length + 1
    }

    const isPerson = persons.find(person => person.name === newName);

    if (!isPerson) {
      setPersons(persons.concat(personObject));
      createPhone(personObject)
    }
    else {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePhone(isPerson.id, personObject)
        .then(res => setPersons(persons.map(person => 
            person.id !== isPerson.id ? person: res
          ))
        );
      }
    }
    
    setNewName("");
    setPhoneNumber("");
  }
  
  const personsToShow = filterValue === "" ? persons :
  persons.filter(person => 
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter filter={filterValue} handleFilter={handleFilter}/>

      <h2>add a New</h2>

      <PersonForm
        handlePhone={handlePhone}
        newName={newName}
        handleName={handleName}
        phoneNumber={phoneNumber}
        handleNumber={handleNumber}
      />
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;