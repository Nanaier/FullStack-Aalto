import { useState, useEffect } from "react";
import Filter from './components/Filter';
import Countries from "./components/Countries";
import countriesService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([]);

  const hook = () => {
    countriesService.getAll().then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const [newFilter, setNewFilter] = useState("");

  return (
    <div>
      <Filter setNewFilter={setNewFilter} newFilter={newFilter} />
      <Countries
        newFilter={newFilter}
        countries={countries}
        setCountries={setCountries}
      />
    </div>
  );
};

export default App;