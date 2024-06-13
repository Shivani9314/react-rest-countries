// App.jsx
import React from 'react';
import Navbar from './components/navbar/Navbar';
import DataFetchingComponent from './components/api/DataFetchingComponent';
import { ThemeProvider, useTheme } from './components/ThemeContext/ThemeContext';

function App() {
  const { darkMode } = useTheme();

  return (
    <ThemeProvider>
      <div className={`flex flex-col h-screen w-full ${darkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
        <Navbar />
        <DataFetchingComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
