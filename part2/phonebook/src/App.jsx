import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getPhone, createPhone, deletePhone, updatePhone } from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [notify, setNotify] = useState(null);
  const [error,setError] = useState(false);

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

  const generateId = () => {
    const maxId = Math.max(...persons.map(person => person.id));
    return maxId + 1;
  }

  const handlePhone = (event) => {
    event.preventDefault();

    const personObject = {
      name : newName,
      number: phoneNumber,
      id: generateId()
    }

    const isPerson = persons.find(person => person.name === newName);

    if (!isPerson) {
      createPhone(personObject)
      .then(res => {
        setError(false)
        setNotify(`Added ${res.name}`)
        setPersons(persons.concat(personObject));
      })
      .catch(error => {
        setError(true);
        setNotify(error.response.data.error)
      })
    }
    else {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        updatePhone(isPerson.id, personObject)
        .then(res => setPersons(persons.map(person => 
            person.id !== isPerson.id ? person: res
          )))
        .then(setNotify(`Updated ${newName}`))
        .then(setError(false))
        .catch((error) => {
          setNotify(`Information of ${newName} has already been removed from the server`);
          setError(true);
          setPersons(persons.filter(person => person.id !== isPerson.id));
        })
      }
    }

    setTimeout(() => {
      setNotify(null);
    }, 5000);

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

      <Notification notify={notify} error={error}/>

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