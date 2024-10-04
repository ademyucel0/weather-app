import axios from 'axios';
import React, {useState, useEffect} from 'react'

const DateTime = ({cityValue}) => {

  const [currentDate, setCurrentDate] = useState(new Date());

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık"
  ];
  
  const monthIndex = currentDate.getMonth();
  const month = months[monthIndex];

  const daysOfWeek = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const dayOfWeekName = daysOfWeek[currentDate.getDay()];

  const minuteFormat = currentDate.getMinutes().toString().padStart(2, '0');

  return (
    <>
      <div className='flex justify-between w-full max-[768px]:flex-col-reverse max-[768px]:gap-3 '>
        <div className='flex flex-col gap-2'>
          <div className='text-5xl max-[768px]:text-center'>{currentDate.getHours()}:{minuteFormat}</div>
          <div className='flex gap-2 text-xl max-[768px]:text-center'>
            <div>{dayOfWeekName},</div>
            <div>{currentDate.getDate()}</div>
            <div>{month}</div>
            <div>{currentDate.getFullYear()}</div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='text-4xl  max-[768px]:text-center'>{cityValue.city.name}</div>
          <div className='text-right max-[768px]:text-center'>{cityValue.city.country}</div>
        </div>
      </div>
      <div>
        <div className='text-4xl'>{console.log(cityValue)}</div>
      </div>
    </>
  )
}

export default DateTime
