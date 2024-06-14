import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Toast from '../toast/Toast';
import { useTheme } from '../../context/ThemeContext';

function SearchComponent({ countriesData, setFilteredData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { darkMode } = useTheme();

  const uniqueRegions = countriesData.reduce((acc, country) => {
    if (country.region && !acc.includes(country.region)) {
      acc.push(country.region);
    }
    return acc;
  }, []);

  const handleSearchCountry = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterData(query, selectedRegion);
  };

  const handleSelectRegion = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    filterData(searchQuery, region);
  };

  const filterData = (query, region) => {
    try {
      let filteredCountries = countriesData;

      if (query) {
        filteredCountries = filteredCountries.filter((country) =>
          country.name.common.toLowerCase().includes(query)
        );
      }

      if (region) {
        filteredCountries = filteredCountries.filter((country) => country.region === region);
      }

      setFilteredData(filteredCountries);
    } catch (error) {
      return <Toast value={error.message} />;
    }
  };

  return (
    <div className="w-full flex justify-between py-10">
      <div className="w-3/5">
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
      <select
        className={`py-0 px-5 focus:outline-none shadow-lg border-none rounded-md appearance-none ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}
        id="select-country"
        onChange={handleSelectRegion}
        value={selectedRegion}
      >
        <option value="" hidden>Filter By Region</option>
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
