import PersonsService from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setErrorMessage,
  setSuccessMessage
}) => {
  const addName = (event) => {
    event.preventDefault();
    var valueArr = persons.map(function (person) {
      return person.name;
    });
    if (valueArr.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        PersonsService.update(person.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : response.data))
            );
            setSuccessMessage(
              `${changedPerson.name}'s phone number was updated to ${changedPerson.number}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `The information of ${changedPerson.name} has already been removedfrom server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);

          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      PersonsService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
      });
      setSuccessMessage(`Added ${personObject.name}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
