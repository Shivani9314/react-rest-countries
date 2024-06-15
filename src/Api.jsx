export const getCountriesData = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
        
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    return data;
}