import { useState, useEffect } from "react";

import "./index.css";
import PersonsService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    PersonsService.getAll().then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />
      <Filter setNewFilter={setNewFilter} newFilter={newFilter} />
      <h3>Add a new</h3>
      <PersonForm
        setNewName={setNewName}
        newName={newName}
        setPersons={setPersons}
        persons={persons}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
      />
      <h2>Numbers</h2>
      <Persons
        newFilter={newFilter}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  );
};

export default App;
