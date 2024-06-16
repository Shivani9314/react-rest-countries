export const getCountriesData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch countries data:', error);
      throw new Error('Failed to fetch countries data');
    }
  }
  