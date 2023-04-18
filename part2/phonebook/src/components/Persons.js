import PersonsService from "../services/persons";

const Persons = ({ newFilter, persons, setPersons }) => {
  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      PersonsService.deleteById(id).then(() => {
        setPersons(persons.filter((item) => item.id != id));
      });
    }
  };
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
            <button
              type="submit"
              onClick={() => handleDelete(person.id, person.name)}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
