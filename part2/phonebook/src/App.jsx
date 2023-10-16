import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
      <h2>Phonebook</h2>

      <div>
        filter shown with <input value={filterValue} onChange={handleFilter}/>
      </div>

      <form onSubmit={handlePhone}>
        <h2>add a New</h2>
        <div>
          name: <input value={newName} onChange={handleName} required/>
        </div>
        <div>
          number: <input value={phoneNumber} onChange={handleNumber} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        personsToShow.map(person => <p key={person.id}>{person.name} {person.phone}</p>)
      }
    </div>
  )
}

export default App;