import React, { useEffect, useState } from 'react';
import CountryCard from '../CountryCard/CountryCard';
import SearchComponent from '../SearchComponent/SearchComponent';
import Toast from '../toast/Toast';
import { useTheme } from '../ThemeContext/ThemeContext';

const DataFetchingComponent = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOriginalData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="absolute top-0 left-0 bg-glare h-full w-full grid place-content-center">
      <div className="text-black text-3xl tracking-widest font-bold">Loading...</div>
    </div>;
  }

  if (error) {
    return <Toast value={error}/>;
  }

  return (
    <div className={`w-full h-full ${darkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
      <div className={`w-4/5 h-full mx-auto flex flex-col items-center `}>
        <SearchComponent data1={originalData} filteredData={filteredData} setFilteredData={setFilteredData} />
        <div className="grid grid-cols-4 py-8 gap-20 justify-between">
        {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <CountryCard key={item.cca3} data1={item} />
            ))
          ) : (
            <div className={`h-full col-span-3 text-center text-xl ${darkMode ? 'text-textDark' : 'text-textLight'}`}>
              No countries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataFetchingComponent;
