import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CustomSelect = ({ onCityChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [cities, setCities] = useState([]);
  
  useEffect(() => {
    async function getCities() {
      try {
        const response = await axios.get('./turkey-cities.json');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }
    getCities();
  }, []);
  
  useEffect(() => {
    function postCity() {
      if (selectedOption) {
        onCityChange(selectedOption.label);
      }
    }
    postCity();
  }, [selectedOption, onCityChange]);


  return (
    <>
      <Select
        className="react-select-container w-3/5 xl:w-1/5 md:w-1/5 text-black !bg-black-600"
        classNamePrefix="react-select"
        placeholder="Şehir Seçiniz"
        defaultValue={{value: 'istanbul', label:'İstanbul'}}
        onChange={setSelectedOption}
        options={cities.map(city => ({ value: city.id, label: city.name }))}
      />
    </>
  );
};

export default CustomSelect;
