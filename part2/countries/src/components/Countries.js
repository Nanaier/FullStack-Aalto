import CountriesService from "../services/countries";
import { useState } from "react";
import "../index.css";

const SingleCountry = ({ countriesToShow, class_name }) => {
  return (
    <div className={class_name}>
      <h1>{countriesToShow[0].name.common}</h1>
      <p>capital {countriesToShow[0].capital[0]}</p>
      <p>area {countriesToShow[0].area}</p>
      <div>
        <h3>languages</h3>
        <ul>
          {Object.values(countriesToShow[0].languages).map((language) => {
            return (
              <li key={language} className="li-element">
                {language}
              </li>
            );
          })}
        </ul>
      </div>
      <img src={countriesToShow[0].flags.png} />
    </div>
  );
};

const Countries = ({ newFilter, countries, setCountries }) => {
  const [selCountry, setSelCountry] = useState(null);

  const showSingleCountry = (country) => {
    if (selCountry !== null && selCountry.name.common === country.name.common)
      setSelCountry(null);
    else
      setSelCountry(country);
  };

  const handleResponce = () => {
    const countriesToShow =
      newFilter === ""
        ? countries
        : countries.filter((country) =>
            country.name.common.toLowerCase().includes(newFilter.toLowerCase())
          );

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (countriesToShow.length === 1) {
      return (
        <SingleCountry countriesToShow={countriesToShow} class_name="country" />
      );
    } else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      return (
        <ul>
          {countriesToShow.map((country) => {
            return (
              <div className={country.name.common} key={country.name.common}>
                <li className="li-element">
                  {country.name.common}
                  <button
                    type="submit"
                    onClick={() => showSingleCountry(country)}
                  >
                    show
                  </button>
                </li>
                <div>
                  {
                    selCountry !== null &&
                    selCountry.name.common === country.name.common && (
                      <SingleCountry
                        countriesToShow={[country]}
                        class_name="country-block"
                      />
                    )}
                </div>
              </div>
            );
          })}
        </ul>
      );
    }
  };

  return <div>{handleResponce()}</div>;
};

export default Countries;
