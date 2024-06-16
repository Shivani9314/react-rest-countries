import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCountriesData } from '../Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';


function CountryDetail() {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await getCountriesData();
        data = data.filter((country) => country.cca3 === id)[0];
        setCountryData(data);
        setStatus({ loading: false, error: null });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    };

    fetchData();
  }, [id]);

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

  let nativeNames = Object.values(countryData.name.nativeName || {}).reduce(
    (accumalator, names) => {
      if (!accumalator.includes(names.common)) {
        accumalator.push(names.common);
      }
      return accumalator;
    },
    []
  );

  let currencies = Object.values(countryData.currencies || {}).reduce(
    (accumalator, currency) => {
      if (!accumalator.includes(currency.name)) {
        accumalator.push(currency.name);
      }
      return accumalator;
    },
    []
  );

  let countryLanguage = Object.values(countryData.languages || {});

  return (
    <div className={`w-full h-full ${darkMode ? 'bg-bgDark text-textDark' : 'bg-bgLight text-textLight'}`}>
     <div className="w-4/5 h-full mx-auto flex flex-col gap-20">
     <Link to = {`/`}>
      <button className= {`mt-10 px-5 py-3 shadow-lg rounded-md ${darkMode ? 'bg-elementDark' : 'bg-elementLight'}`}><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
      </Link>
      <div className='flex flex-col lg:flex-row gap-20 items-center'>
        <img className=' w-full lg:w-1/2' src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
        <div className='flex flex-col gap-10 justify-center'>
          <h1 className='text-2xl font-bold '>{countryData.name.common}</h1>
          <div className='flex flex-col gap-10 mb-10 lg:grid lg:grid-cols-2 lg:gap-10 lg:mb-0'>
            <div className='flex flex-col gap-5 text-l'>
              <p><strong>Native Name: </strong> {nativeNames.length !== 0 ? nativeNames.join(", ") : "N/A"}</p>
              <p><strong>Population: </strong> {countryData.population}</p>
              <p><strong>Region: </strong> {countryData.region} </p>
              <p><strong>Sub-Region: </strong> {countryData.subregion}</p>
              <p><strong>Capital: </strong> {countryData.capital}</p>
            </div>
            <div className='flex flex-col gap-5'>
              <p><strong>Domain:</strong> {countryData.tld.length !== 0 ? countryData.tld.join(",") : "N/A"}</p>
              <p><strong>Currencies:</strong> {currencies.length !== 0 ? currencies.join(", ") : "N/A"}</p>
              <p><strong>Languages:</strong> {countryLanguage.length !== 0 ? countryLanguage.join(", ") : "N/A"}</p>
            </div>
            <div className='col-span-2 flex flex-wrap gap-2 items-center'>
              <h4><strong>Border Countries :</strong></h4>
              {countryData.borders ? (
                countryData.borders.map((border) => (
                  <Link className={`p-2 shadow-lg rounded-md ${darkMode ? 'bg-elementDark' : 'bg-elementLight'}`} key={border} to={`/country/${border}`}>{border}</Link>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
}

export default CountryDetail;
