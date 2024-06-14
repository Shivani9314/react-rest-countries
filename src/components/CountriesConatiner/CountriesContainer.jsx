import React, { useEffect, useState } from 'react';
import CountryCard from '../CountryCard/CountryCard';
import SearchComponent from '../SearchComponent/SearchComponent';
import Toast from '../toast/Toast';
import { useTheme } from '../../context/ThemeContext';

const CountriesContainer = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountriesData(data);
        setFilteredData(data);
        setStatus({ loading: false, error: null });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

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
        <SearchComponent countriesData={countriesData} setFilteredData={setFilteredData} />
        <div className="grid grid-cols-4 py-8 gap-20 justify-between">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <CountryCard key={item.cca3} data1={item} />
            ))
          ) : (
            <div className={`h-full col-span-4 text-center text-xl ${darkMode ? 'text-textDark' : 'text-textLight'}`}>
              No countries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesContainer;
