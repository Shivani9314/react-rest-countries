import React, { useEffect, useState } from 'react';
import CountryCard from '../components/CountryCard';
import Toast from '../components/Toast';
import { useTheme } from '../context/ThemeContext';
import { getCountriesData } from '../Api';
import SearchInput from '../components/SearchInput';
import Filter from '../components/Filter';
import Sort from '../components/Sort';

const CountriesContainer = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [sortByPopulation, setSortByPopulation] = useState('');
  const [sortByArea, setSortByArea] = useState('');
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountriesData();
        setCountriesData(data);
        setStatus({ loading: false, error: null });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  const uniqueRegions = countriesData.reduce((accumulator, country) => {
    if (country.region && !accumulator.includes(country.region)) {
      accumulator.push(country.region);
    }
    return accumulator;
  }, []);

  const getSubRegions = (region) => {
    if (!region) return new Set();
    const filteredSubRegions = countriesData
      .filter(country => country.region === region)
      .map(country => country.subregion)
      .filter(subregion => subregion);

    return new Set(filteredSubRegions);
  };

  const handleSearch = (countryName) => {
    setSearchQuery(countryName);
  };

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
    setSelectedSubRegion('');
  };

  const handleSelectSubRegion = (subRegion) => {
    setSelectedSubRegion(subRegion);
  };

  const handleSortByPopulation = (order) => {
    setSortByPopulation(order);
    setSortByArea('');
  };

  const handleSortByArea = (order) => {
    setSortByArea(order);
    setSortByPopulation(''); 
  };

  const filterData = () => {
    let filteredCountries = countriesData;

    if (searchQuery) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion) {
      filteredCountries = filteredCountries.filter((country) => country.region === selectedRegion);
    }

    if (selectedSubRegion) {
      filteredCountries = filteredCountries.filter((country) => country.subregion === selectedSubRegion);
    }

    if (sortByPopulation) {
      filteredCountries.sort((a, b) => {
        if (sortByPopulation === 'asc') {
          return a.population - b.population;
        } else {
          return b.population - a.population;
        }
      });
    } else if (sortByArea) {
      filteredCountries.sort((a, b) => {
        if (sortByArea === 'asc') {
          return a.area - b.area;
        } else {
          return b.area - a.area;
        }
      });
    }

    return filteredCountries;
  };

  const filteredData = filterData();
  const subRegions = Array.from(getSubRegions(selectedRegion));

  if (status.loading) {
    return (
      <div className="absolute top-0 left-0 bg-glare h-full w-full grid place-content-center">
        <div className="text-black text-3xl tracking-widest font-bold">Loading...</div>
      </div>
    );
  }

  if (status.error) {
    return <Toast value={status.error} />;
  }

  return (
    <div className={`w-full h-full ${darkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
      <div className="w-4/5 h-full mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row  gap-5 justify-between py-10">
          <SearchInput onSearch={handleSearch} />
          <Filter onSelect={handleSelectRegion} target={uniqueRegions} filterBy="Region" />
          {selectedRegion && (
            <Filter onSelect={handleSelectSubRegion} target={subRegions} filterBy="SubRegion" />
          )}
          <Sort
            label="Sort by Population" 
            sortOrder={sortByPopulation} 
            onSort={handleSortByPopulation} 
          />
          <Sort 
            label="Sort by Area" 
            sortOrder={sortByArea} 
            onSort={handleSortByArea} 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-8 gap-10 justify-between">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <CountryCard key={item.cca3} data={item} />
            ))
          ) : (
            <div className={`h-full col-span-full text-center text-xl ${darkMode ? 'text-textDark' : 'text-textLight'}`}>
              No countries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesContainer;
