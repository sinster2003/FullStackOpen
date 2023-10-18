import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getPhone, createPhone } from "./services/phonebook";

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

  const handlePhone = (event) => {
    event.preventDefault();

    const isPerson = persons.find(person => person.name === newName);

    if (!isPerson) {

      const personObject = {
        name : newName,
        phone: phoneNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(personObject));

      createPhone(personObject)
      .then(res => console.log(res))
    }
    else {
      alert(`${newName} is already added to the phonebook`);
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
      
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App;