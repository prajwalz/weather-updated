import React, { useEffect, useState } from 'react'
import './Home.css'

export default function Home() {

    const [condition, setCondition] = useState("null")
    const [temp, setTemp]   = useState("null")
    const [rain, setRain] = useState("null")
    const [feels, setFeels] = useState("null")
    const [humidity, setHumidity] = useState("null")
    const [wind, setWind] = useState("null")
    const [pressure, setPressure] = useState("null")
    const [visiblity, setVisiblity] = useState("null")
    const [sunrise, setSunRise] = useState("null")
    const [sunset, setSunset] = useState("null")
    const [uv, setUv] = useState("null")
    const [image, setImage] = useState("null")
    const [image_author, setAuthor] = useState("null")
    const [image_author_link, setAuthorLink] = useState("null")

    const [day_1, setDay_1] = useState("Tomorrow")
    const [day_1_condition, setDay_1_condition] = useState("null")
    const [day_1_temp,  setDay_1_temp] = useState("null")
    const [day_1_rain,  setDay_1_rain] = useState("null")
    
    const [day_2, setDay_2] = useState("null")
    const [day_2_condition, setDay_2_condition] = useState("null")
    const [day_2_temp,  setDay_2_temp] = useState("null")
    const [day_2_rain,  setDay_2_rain] = useState("null")


    const [location, setLocation] = useState("dublin")
    const [loading, setLoading] = useState(true)
    
    const getData = async () => {
        setLoading(false)
        const res = await fetch(`https://weather-api-50.herokuapp.com/weather/${location}`)
        const resdata = await res.json()
        console.log(resdata)
        setCondition(resdata.current.condition.text)
        setTemp(resdata.current.temp_c)
        setRain(resdata.forecast.forecastday[0].day.daily_chance_of_rain)
        setFeels(resdata.current.feelslike_c)
        setHumidity(resdata.current.humidity)
        setWind(resdata.current.wind_kph)
        setPressure(resdata.current.pressure_mb)
        setVisiblity(resdata.current.vis_km)
        setUv(resdata.current.uv)
        setSunRise(resdata.forecast.forecastday[0].astro.sunrise)
        setSunset(resdata.forecast.forecastday[0].astro.sunset)
        setImage(resdata.urls.regular)
        setAuthor(resdata.user.name)
        setAuthorLink(resdata.user.links.html)


        setDay_1_condition(resdata.forecast.forecastday[1].day.condition.text)
        setDay_1_temp(resdata.forecast.forecastday[1].day.maxtemp_c+"°C/"+resdata.forecast.forecastday[1].day.mintemp_c+"°C")
        setDay_1_rain(resdata.forecast.forecastday[1].day.daily_chance_of_rain)

        
        const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        const day2_epoch = resdata.forecast.forecastday[2].date_epoch;
        const day2 = new Date(day2_epoch*1000);
        setDay_2(day2.getDate()+"/"+months[day2.getMonth()])
        setDay_2_condition(resdata.forecast.forecastday[2].day.condition.text)
        setDay_2_temp(resdata.forecast.forecastday[2].day.maxtemp_c+"°C/"+resdata.forecast.forecastday[2].day.mintemp_c+"°C")
        setDay_2_rain(resdata.forecast.forecastday[2].day.daily_chance_of_rain)
        setLoading(false)
    }

    const setPlace = (e) => {
        setLocation(e.target.value)
    }

    useEffect(() => {
        if(!location){
            getData()
        }
    }, [location])

    return (

        <>

<div class="main_container">
        <div class="search_bar">
            <input type="text" placeholder="Enter city" onChange={setPlace} class="search" id="place" />
            <button onClick={getData} id="submit" class="search_btn">&#128269;</button>
        </div>

        <div class="container two_containers">
        { 
                       
                       loading ? 
                        <div id="intro" class="intro">
                            <span class="greetings">Let's search for today's weather.</span>
                        </div>
                       :
<>
            <div class="left_container">
                <div class="image_container">
                    <div class="image_wrapper">
                        <img class="image" id="image" src={image} alt="" />
                    </div>
                    <a class="image_author" id="image_author" href={image_author_link} >{image_author}</a>
                </div>
                
                <div class="forecast_container">
                    <div class="days_container">
                        <p class="fr_day" id="day_1">{day_1}</p>
                            <p class="fr_text"id="day_1_condition">{day_1_condition}</p>
                            <p class="fr_text" id="day_1_temp">{day_1_temp}</p>
                        <p class="fr_text" id="day_1_rain">{day_1_rain}%</p>
                    </div>
                    <div class="days_container">
                        <p class="fr_day" id="day_2">{day_2}</p>
                        <p class="fr_text"id="day_2_condition">{day_2_condition}</p>
                        <p class="fr_text" id="day_2_temp">{day_2_temp}</p>
                        <p class="fr_text" id="day_2_rain">{day_2_rain}%</p>
                    </div>
                </div>
            </div>
            <div class="right_container today_container">
                    <div class="condition">
                        <p class="light" id="condition">{condition}</p>
                        <p class="big_bold" id="temperature">{temp}°C</p>
                    </div>
                    <div class="rain">
                        <p class="label" >chance of rain</p>
                    </div>
                    <div class="rainresult">
                        <p class="value" id="rain">{rain}%</p>
                    </div>
                    <div class="feel">
                        <p class="label">feels like</p>
                        <p class="value" id="feels">{feels}°C</p>
                    </div>

                    <div class="wind">
                        <p class="label">wind</p>
                        <p class="value" id="wind">{wind}KMPH</p>
                    </div>
                    
                    <div class="visiblity">
                        <p class="label">visiblity</p>
                        <p class="value" id="visiblity">{visiblity}KM</p>
                    </div>
                    
                    <div class="sunrise">
                        <p class="label">Sun Rise</p>
                        <p class="value" id="sunrise">{sunrise}</p>
                    </div>


                    <div class="humidity">
                        <p class="label">humidity</p>
                        <p class="value" id="humidity">{humidity}%</p>
                    </div>
                    <div class="pressure">
                        <p class="label">pressure</p>
                        <p class="value" id="pressure">{pressure}MBAR</p>
                    </div>
                    <div class="uv">
                        <p class="label">uv</p>
                        <p class="value" id="uv">{uv}</p>
                    </div>
                    <div class="sunset">
                        <p class="label">Sun Set</p>
                        <p class="value" id="sunset">{sunset}</p>
                    </div>
            </div>
            </> 
}
        </div> 
        
</div>
</>
    )
}
