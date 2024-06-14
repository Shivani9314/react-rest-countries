// App.jsx
import React from 'react';
import Navbar from './components/navbar/Navbar';
import CountriesContainer from './components/CountriesConatiner/CountriesContainer';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function App() {
  const { darkMode } = useTheme();

  return (
    <ThemeProvider>
      <div className={`flex flex-col min-h-screen w-full ${darkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
        <Navbar />
        <CountriesContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
