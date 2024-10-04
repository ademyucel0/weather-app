import axios from 'axios'
import React, { useEffect } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';

const Card = ({cityValue}) => {

  const weatherIcons = {
    500: "img/icons/rainy.png", // Hafif Yağmur
    501: "img/icons/rainy.png", // Orta Şiddetli Yağmur
    600: "img/icons/light-snowy.png", // Hafif Kar Yağışlı
    601: "img/icons/light-snowy.png", // Kar Yağışlı
    800: "img/icons/clear.png", // Açık Hava
    801: "img/icons/clouds.png", // Az Bulutlu
    802: "img/icons/partly-cloudy-day.png", // Parçalı Az Bulutlu
    803: "img/icons/partly-cloudy-day.png", // Parçalı Bulutlu
    804: "img/icons/closed.png", // Kapalı
  };

  function getTurkishDayName(dateString) {
    const turkishDays = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const dateObject = new Date(dateString);
    const dayIndex = dateObject.getDay();
    return turkishDays[dayIndex];
}
  
  function todayDate(date){
    const today = new Date();
    let dateObject  = new Date(date);
    if (dateObject.toDateString() === today.toDateString()) {
      return "Bugün"; // Eşleşiyorsa "Bugün" yazdır
    } else {
        const dayOfWeek = getTurkishDayName(date); // Haftanın karşılık geldiği gün adını al
        return `${dayOfWeek}`; // Gün ve gün adını birleştirip döndür
    }
  }
  

  return (
    <>
    <div className='p-10 bg-[#173f41ba] w-11/12 flex gap-10 justify-around max-[768px]:flex-wrap max-[768px]:p-5 max-[768px]:gap-5'>
    {[...new Set(cityValue.list.map((item) => item.dt_txt.split(' ')[0]))].map((date, index) => {
      const totalTemp = cityValue.list.filter((item) => item.dt_txt.split(' ')[0] === date)
        .reduce((acc, cur) => acc + cur.main.temp, 0);
      const averageTemp = totalTemp / cityValue.list.filter((item) => item.dt_txt.split(' ')[0] === date).length;
      const weatherDescription = cityValue.list.find((item) => item.dt_txt.split(' ')[0] === date)?.weather[0].description;
      const weatherIdForIcon = cityValue.list.find((item) => item.dt_txt.split(' ')[0] === date)?.weather[0].id;
      const weatherIconPath = weatherIcons[weatherIdForIcon];
      return (
        <div key={index} className="text-center flex flex-col items-center text-white max-[768px]:w-1/3 gap-2">
          <p>{todayDate(date)}</p>
          <p>{weatherDescription}</p>
          <img className='rounded-2xl' src={weatherIconPath}/>
          <p>{Math.round(averageTemp)}  °</p> 
        </div>
      );
    })}
    </div>
  </>
  )
}

export default Card