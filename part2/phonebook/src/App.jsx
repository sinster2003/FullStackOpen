import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ]);
  const [newName, setNewName] = useState("");

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handlePhone = (event) => {
    event.preventDefault();

    const isPerson = persons.find(person => person.name === newName);

    if (!isPerson) {

      const personObject = {
        name : newName
      }

      setPersons(persons.concat(personObject));
    }
    else {
      alert(`${newName} is already added to the phonebook`);
    }
    
    setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handlePhone}>
        <div>
          name: <input value={newName} onChange={handleName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <p key={person.name}>{person.name}</p>)
      }
    </div>
  )
}

export default App;