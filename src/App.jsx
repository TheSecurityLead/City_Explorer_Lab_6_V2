import React, { useState } from 'react';
import axios from 'axios';

const CityExplorer = () => {
  const [cityName, setCityName] = useState('');
  const [locationData, setLocationData] = useState(null);

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const exploreCity = async () => {
    try {
      const response = await axios.get(
        'https://us1.locationiq.com/v1/search.php',
        {
          params: {
            key: process.env.REACT_APP_LOCATIONIQ_API_KEY,
            q: cityName,
            format: 'json',
          },
        }
      );

      
      const firstLocation = response.data[0];

      
      setLocationData({
        displayName: firstLocation.display_name,
        latitude: firstLocation.lat,
        longitude: firstLocation.lon,
      });
    } catch (error) {
      console.error('Error exploring city:', error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Enter City Name:
          <input type="text" value={cityName} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={exploreCity}>
          Explore!
        </button>
      </form>

      {locationData && (
        <div>
          <h2>Location Information</h2>
          <p>
            <strong>City:</strong> {locationData.displayName}
          </p>
          <p>
            <strong>Latitude:</strong> {locationData.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {locationData.longitude}
          </p>
        </div>
      )}
    </div>
  );
};

export default CityExplorer;
