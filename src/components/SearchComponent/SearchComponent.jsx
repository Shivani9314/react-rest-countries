import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Toast from '../toast/Toast';
import { useTheme } from '../ThemeContext/ThemeContext';

function SearchComponent({ data1, filteredData, setFilteredData }) {
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const { darkMode } = useTheme();


  useEffect(() => {
    try {
      const regions = data1.reduce((acc, country) => {
        if (country.region && !acc.includes(country.region)) {
          acc.push(country.region);
        }
        return acc;
      }, []);
      setUniqueRegions(regions);
    } catch (error) {
        <Toast value={error}/>;
    }
  }, [data1]);

  const handleSearchCountry = (e) => {
    try {
      const searchedCountry = e.target.value.toLowerCase();
      const filteredCountries = data1.filter((country) => {
        return country.name.common.toLowerCase().includes(searchedCountry);
      });

      setFilteredData(filteredCountries);
    } catch (error) {
      <Toast value={error}/>;
    }
  };

  const handleSelectRegion = (e) => {
    try {
      const region = e.target.value;
      const filteredCountries = filteredData.filter((country) => country.region === region);

      setFilteredData(filteredCountries);
    } catch (error) {
        <Toast value={error}/>;
    }
  };

  return (
    <div className='w-full flex justify-between py-10'>
      <div className='w-3/5'>
        <div className={`flex items-center shadow-lg w-3/5 px-5 rounded-md ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            className={`p-5 border-none focus:outline-none ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}
            type="text"
            id="search-input"
            placeholder="Search for a country"
            onChange={handleSearchCountry}
          />
        </div>
      </div>
      <select className={`py-0 px-5 focus:outline-none shadow-lg border-none rounded-md appearance-none ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`} id="select-country" onChange={handleSelectRegion}>
        <option value="" hidden>
          Filter By region
        </option>
        {uniqueRegions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchComponent;
