import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Sort({ label, sortOrder, onSort }) {
  const { darkMode } = useTheme();

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="flex gap-5">
      <select
        className={`py-3 lg:py-0 px-5 focus:outline-none shadow-lg border-none rounded-md appearance-none hover:cursor-pointer ${darkMode ? 'bg-elementDark text-textDark' : 'bg-elementLight text-textLight'} ${sortOrder ? 'scale-110' : ''}`}
        onChange={handleSortChange}
        value={sortOrder}
      >
        <option value="" hidden>{label}</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default Sort;
