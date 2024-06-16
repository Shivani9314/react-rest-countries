import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Link } from "react-router-dom";

const CountryCard = ({ data }) => {
  const { darkMode } = useTheme();

  return (
    <Link to={`/country/${data.cca3}`} className={`flex flex-col shadow-lg w-full hover:scale-105 rounded-md overflow-hidden ${darkMode ? 'bg-elementDark' : 'bg-elementLight'} ${darkMode ? 'text-white' : 'text-black'}`}>
      <img className="w-full mb-5 h-1/2 object-cover" src={data.flags.png} alt={`Flag of ${data.name.common}`} />
      <h2 className="px-5 text-xl font-semibold mb-5">{data.name.common}</h2>
      <p className="px-5 mb-2"><strong>Population</strong>: {data.population}</p>
      <p className="px-5 mb-2"><strong>Region</strong>: {data.region}</p>
      <p className="px-5 mb-2"><strong>Capital</strong>: {data.capital ? data.capital[0] : 'N/A'}</p>
    </Link>
  );
};

export default CountryCard;
