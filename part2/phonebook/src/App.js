import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

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
