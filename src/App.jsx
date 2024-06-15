// App.jsx
import React from 'react';
import Navbar from './components/Navbar';
import CountriesContainer from './pages/CountriesContainer';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CountryDetail from './pages/CountryDetail';

function App() {
  const { darkMode } = useTheme();
  const router = createBrowserRouter([
    {

    path : "/",
    element : <CountriesContainer/>,
  },
  {
    path : '/country/:id',
    element : <CountryDetail/>
  }
  ])


  return (
    <ThemeProvider>
      <div className={`flex flex-col min-h-screen w-full ${darkMode ? 'bg-bgDark' : 'bg-bgLight'}`}>
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
