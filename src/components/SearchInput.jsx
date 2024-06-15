import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchInput({onSearch}) {

    const { darkMode } = useTheme();

    let [inputSearch, setInputSearch] = useState("");
    const handleSearchCountry = (e) =>{
        setInputSearch(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className="w-3/5">
            <div className={`flex items-center shadow-lg w-3/5 px-5 rounded-md ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <input
                    className={`p-5 border-none focus:outline-none ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}
                    type="text"
                    placeholder="Search for a country"
                    onChange={handleSearchCountry}
                    value={inputSearch}
                />
            </div>
        </div>

    )
}

export default SearchInput