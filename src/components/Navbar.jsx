import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon , faSun} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`w-full flex justify-center shadow-lg ${darkMode ? 'bg-elementDark' : 'bg-elementLight'}`}>
      <div className="flex w-4/5 py-8 items-center justify-between">
        <h1 className={`text-2xl font-semibold ${darkMode ? 'text-textDark' : 'text-textLight'}`}>Where in the World?</h1>
        <div className={`flex gap-3 text-l items-center ${darkMode ? 'text-white' : 'text-black'} cursor-pointer`} onClick={toggleDarkMode}>
          {darkMode ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon} />}
          <p>{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
