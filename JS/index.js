console.log('Working');
const apiKey = `6997b41254e34912920160327232106`

const yearName = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const yearName2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const weeksName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const inputField = document.querySelector('.inputField')
const closeBtn = document.getElementById('closeBtn')
inputField.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        fetchData(e.target.value)
    }
})

closeBtn.addEventListener('click',()=>{
    inputField.value = ''
})


fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=patna&days=3&aqi=yes&alerts=yes`).then((res)=> res.json()).then((data)=> displayData(data)).catch((error)=> console.log(error))


function fetchData(cityName) {
    const response = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3&aqi=yes&alerts=yes`)

    response.then((res) => {
        return res.json()
    }).then((data) => {
        displayData(data)
    }).catch((error) => {
        console.log(error);
    })
}

function displayData(data) {
    // select element form DOM 
    const cCity = document.getElementById('cCity')
    const region = document.getElementById('region')
    const date = document.getElementById('date')
    const dayName = document.getElementById('dayName')
    const crrTime = document.getElementById('crrTime')
    const temp = document.getElementById('temp')
    const wImg = document.getElementById('wImg')
    const wStat = document.querySelector('.wStat')

    // select element from right section 

    const day1_dayName = document.getElementById('day1_dayName')
    const day1_img = document.getElementById('day1_img')
    const day1_temp = document.getElementById('day1_temp')
    const day1_wind = document.getElementById('day1_wind')
    const day2_dayName = document.getElementById('day2_dayName')
    const day2_img = document.getElementById('day2_img')
    const day2_temp = document.getElementById('day2_temp')
    const day2_wind = document.getElementById('day2_wind')
    const day3_dayName = document.getElementById('day3_dayName')
    const day3_img = document.getElementById('day3_img')
    const day3_temp = document.getElementById('day3_temp')
    const day3_wind = document.getElementById('day3_wind')

    // select element of today's heighlight 

    const humidity = document.getElementById('humidity')
    const visibility = document.getElementById('visibility')
    const airQuality = document.getElementById('airQuality')
    const windStat = document.getElementById('windStat')

    // date convert into day and time 
    const dateRes = data.location.localtime
    const timeRes = dateRes.split(' ')[1]
    const dayRes = dateRes.split(' ')[0]


    // set image of current weather 

    wImg.src = `${data.current.condition.icon}`

    // set the current weather stat 

    wStat.innerHTML = `${data.current.condition.text}`

    // set the current temperature 

    temp.innerHTML = `${data.current.temp_c}<sup>o <span>C</span></sup>`

    // set current day name 
    const newDate = new Date(dateRes)
    weeksName.forEach((day, index) => {
        if (index === newDate.getDay()) {
            dayName.innerHTML = day
        }
    })

    // set current time 
    crrTime.innerHTML = `${timeRes}`

    // set current city name and region name 
    cCity.innerHTML = `${data.location.name}`
    region.innerHTML = `${data.location.region}`

    // set current year name 
    yearName.forEach((year, index) => {
        if (index === Number(dayRes.split('-')[1].split('')[1])) {
            date.innerHTML = `<span>${dayRes.split('-')[2]} ${year}</span> | <span>${timeRes}</span>`

            // first day forecasting year same as left side year 
            day1_dayName.innerHTML = `<span>${dayRes.split('-')[2]} ${year}</span>`
        }
    })



    // setting data to right section starts from here .....................

    // day 1 forecasting. 
    day1_img.src = `${data.forecast.forecastday[0].day.condition.icon}`

    day1_temp.innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}<sup>o</sup>-${data.forecast.forecastday[0].day.mintemp_c}<sup>o</sup>`

    day1_wind.innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph} Km/h`

    // day 2 forecasting. 
    const day2_date = data.forecast.forecastday[1].date
    const newDateDay2 = new Date(day2_date)
    console.log(newDateDay2.getMonth());
    
    yearName2.forEach((year, index) => {
        if (index === Number(newDateDay2.getMonth())) {
            day2_dayName.innerHTML = `<span>${newDateDay2.getDate()} ${year}</span>`
        }
    })

    day2_img.src = `${data.forecast.forecastday[1].day.condition.icon}`

    day2_temp.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>-${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`

    day2_wind.innerHTML = `${data.forecast.forecastday[1].day.maxwind_kph} Km/h`


    // day 3 forecasting. 

    const day3_date = data.forecast.forecastday[2].date
    const newDateDay3 = new Date(day3_date)
    yearName2.forEach((year, index) => {
        if (index === Number(newDateDay3.getMonth())) {
            day3_dayName.innerHTML = `<span>${newDateDay3.getDate()} ${year}</span>`
        }
    })
    
    day3_img.src = `${data.forecast.forecastday[2].day.condition.icon}`

    day3_temp.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>-${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`

    day3_wind.innerHTML = `${data.forecast.forecastday[2].day.maxwind_kph} Km/h`



    // today's heighlight data insertion from here 

    humidity.innerHTML = `${data.current.humidity} %`

    visibility.innerHTML = `${data.current.vis_km} Km`

    airQuality.innerHTML = `${data.current.air_quality.co}`

    windStat.innerHTML = `${data.current.wind_kph} Km/h`
}