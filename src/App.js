import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import './tailwind.css';
import Card from './components/Card';
import DateTime from './components/DateTime';
import CustomSelect from './components/CustomSelect';

function App() {

  const apiKey = 'c6398898b80357a018cdc9b8970b454e';
  const [city, setCity] = useState('')
  const [searchCity, setSearchCity] = useState('istanbul')

  const handleCityChange = (selectedCity) => {
    setSearchCity(selectedCity);
  };

  useEffect(() => {
    async function getApi(){
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&lang=tr&units=metric`);
            setCity(response.data);
        }
        catch (error){
            console.error(error);
        }
    }
    getApi();
  }, [searchCity]);

  return (
    <div style={{backgroundImage: `url('img/big-bg.jpg')`}} className="w-full flex justify-center bg-cover h-full md:h-screen max-[768px]:py-5">
      <div className='container flex flex-col items-center justify-center'>
        <div style={{backgroundImage: `url('img/rainy.jpg')`}} className="h-2/5 w-11/12 py-10 px-20 items-center flex flex-col bg-no-repeat bg-cover shadow-lg text-white gap-4 max-[768px]:px-10">
            <CustomSelect onCityChange={handleCityChange} />
            {Object.keys(city).length !== 0 ? <DateTime  cityValue={city}/>:<p>Şehir bilgisi yükleniyor...</p>}
        </div>
        {Object.keys(city).length !== 0 ? <Card cityValue={city}/> : <p>Şehir bilgisi yükleniyor...</p>}
      </div>
    </div>
  );
}

export default App;
