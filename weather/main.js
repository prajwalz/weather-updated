const btn = document.getElementById('submit')
const condition = document.getElementById('condition')
const temp = document.getElementById('temperature')
const rain = document.getElementById('rain')
const feels = document.getElementById('feels')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')
const uv = document.getElementById('uv')
const pressure = document.getElementById('pressure')
const visiblity = document.getElementById('visiblity')
const uv = document.getElementById('uv')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const image = document.getElementById('image')
const image_author = document.getElementById('image_author')


const day_1 = document.getElementById('day_1')
const day_1_condition = document.getElementById('day_1_condition')
const day_1_temp = document.getElementById('day_1_temp')
const day_1_rain = document.getElementById('day_1_rain')

const day_2 = document.getElementById('day_2')
const day_2_condition = document.getElementById('day_2_condition')
const day_2_temp = document.getElementById('day_2_temp')
const day_2_rain = document.getElementById('day_2_rain')

const wrapper = document.getElementById('intro')

btn.addEventListener('click' , async () =>{
    const place = document.getElementById('place').value
    //console.log(place)
    const res = await fetch(`https://weather-api-50.herokuapp.com/weather/${place}`)
    const data = await res.json()
    if(data){
        //console.log(data)
        image.src = data.urls.regular
        image_author.innerText = data.user.name
        image_author.href = data.user.links.html
        condition.innerText = data.current.condition.text
        temp.innerText = data.current.temp_c+"°C"
        rain.innerText = data.forecast.forecastday[0].day.daily_chance_of_rain+"%"
        feels.innerText = data.current.feelslike_c+"°C"
        humidity.innerText = data.current.humidity+"%"
        uv.innerText = data.current.uv
        wind.innerText = data.current.wind_kph+"Kph"
        pressure.innerText = data.current.pressure_mb+"Mbar"
        visiblity.innerText = data.current.vis_km+"Km"
        uv.innerText = data.current.uv
        sunrise.innerText = data.forecast.forecastday[0].astro.sunrise
        sunset.innerText = data.forecast.forecastday[0].astro.sunset


        day_1.innerText = "Tomorrow"
        day_1_condition.innerText = data.forecast.forecastday[1].day.condition.text
        day_1_temp.innerText = data.forecast.forecastday[1].day.maxtemp_c+"°C/"+data.forecast.forecastday[1].day.mintemp_c+"°C"
        day_1_rain.innerText = data.forecast.forecastday[1].day.daily_chance_of_rain+"%"

        const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        const day2_epoch = data.forecast.forecastday[2].date_epoch;
        const day2 = new Date(day2_epoch*1000);
        day_2.innerText = day2.getDate()+"/"+months[day2.getMonth()];  
        day_2_condition.innerText = data.forecast.forecastday[2].day.condition.text
        day_2_temp.innerText = data.forecast.forecastday[2].day.maxtemp_c+"°C/"+data.forecast.forecastday[1].day.mintemp_c+"°C"
        day_2_rain.innerText = data.forecast.forecastday[2].day.daily_chance_of_rain+"%"

        intro.style.display ="none";
    }
    

    
})