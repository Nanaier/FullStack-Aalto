import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setNewFilter={setNewFilter} newFilter={newFilter} />
      <h3>Add a new</h3>
      <PersonForm
        setNewName={setNewName}
        newName={newName}
        setPersons={setPersons}
        persons={persons}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} />
    </div>
  );
};

export default App;
