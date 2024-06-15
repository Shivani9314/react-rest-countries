import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Filter({ onSelect, target, filterBy }) {
  const { darkMode } = useTheme();

  const handleSelect = (e) => {
    onSelect(e.target.value);
  };

  return (
    <div className="flex gap-5 ">
      <select
        className={`py-0 px-5 focus:outline-none shadow-lg border-none rounded-md appearance-none  ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'}`}
        onChange={handleSelect}
      >
        <option value="" hidden>{`Filter By ${filterBy}`}</option>
        {[...target].map((response, index) => (
          <option key={index} value={response}>
            {response}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
