// CountryCard.jsx
import React from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';

const CountryCard = ({ data1 }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`flex flex-col shadow-lg w-full rounded-md overflow-hidden ${darkMode ? 'bg-elementDark' : 'bg-elementLight'} ${darkMode ? 'text-white' : 'text-black'}`}>
      <img className='w-full mb-5 h-1/2 object-cover' src={data1.flags.png} alt={`Flag of ${data1.name.common}`} width="100" />
      <h2 className='px-5 text-xl font-semibold mb-5'>{data1.name.common}</h2>
      <p className='px-5 mb-2'><strong>Population</strong>: {data1.population}</p>
      <p className='px-5 mb-2'><strong>Region</strong>: {data1.region}</p>
      <p className='px-5 mb-2'><strong>Capital</strong>: {data1.capital ? data1.capital[0] : 'N/A'}</p>
    </div>
  );
};

export default CountryCard;
