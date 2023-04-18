const Persons = ({ newFilter, persons }) => {
  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
