const API = 'b875c6b8e3be1c0a5f0931a71927d924'

let ctime = document.querySelector('.time');
let cdate = document.querySelector('.date');
let cmonth = document.querySelector('.month');
let cyear = document.querySelector('.year');

let Cityname = document.querySelector('.cityName');
let citytemp = document.querySelector('.temp');
let humidity = document.querySelector('.humidity');
let desc = document.querySelector('.description');
let inp = document.getElementById('inp');
let details = document.querySelector('.details');

let wind = document.querySelector('.wind-speed');
let press = document.querySelector('.Pressure');
let SeaLevel = document.querySelector('.Sea_level');
let Sunrise = document.querySelector('.Sunrise');
let Sunset = document.querySelector('.Sunset');



let weeks = ['Sunday', 'Monday', 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"];
const allmonths = ["Jan", "Feb", "Mar", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

setInterval(() => {
    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hrs = time.getHours();
    const mins = time.getMinutes();
    const secs = time.getSeconds();
    // time.

    const sec = time.getSeconds();
    // console.log(ar[day]);

    // ctime.innerHTML = hrs + ":" + mins +":"+secs
    ctime.innerHTML = hrs < 10 ? "0" + hrs + ":" + mins + ":" + secs : hrs + ":" + mins + ":" + secs

    cdate.innerHTML = day + "-" + allmonths[month + 1] + "-" + year;
}, 1000);


getW()
function getW() {

    navigator.geolocation.getCurrentPosition((success) => {
        let lati = success.coords.latitude
        let longi = success.coords.longitude
        // console.log(success);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API}`).then(res => res.json()).then(data => {
            console.log(data);
            settimedate(data)
            // console.log(Math.round((data.main.temp - 273.15)*100)/100);
        })
    })
}
function settimedate(data) {
    let ss = data.sys.sunrise;

    let sr = data.sys.sunset;
    let ss1 = new Date(ss * 1000);
    let sr1 = new Date(sr * 1000);
    // console.log(data);

    Cityname.innerHTML = data.name
    citytemp.innerHTML = Math.round((data.main.feels_like - 274) * 10) / 10 + "°C " + "Max: " + Math.round((data.main.temp - 274) * 10) / 10 + "°C "
    humidity.innerHTML = "Humidity : " + data.main.humidity + " %"
    wind.innerHTML = "Wind Speed : " + data.wind.speed + " m/s"
    desc.innerHTML = data.weather[0].description
    press.innerHTML = "Pressure : " + data.main.pressure
    SeaLevel.innerHTML = "Sea Level : " + data.main.sea_level
    Sunrise.innerHTML = "Sunrise : " + sr1
    Sunset.innerHTML = "Sunset : " + ss1



}

inp.addEventListener('keypress',(e)=>{
    if(e.key == 'Enter'){
        getdatabtplace(inp.value)
    }
})


document.querySelector('.but').addEventListener('click', () => {
    // console.log(inp.value);

    getdatabtplace(inp.value)
})
function getdatabtplace(inp) {
    console.log(inp);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${API}`).then(res => res.json()).then(data => {
        console.log(data);


        settimedate(data);
        // console.log(Math.round((data.main.temp - 273.15)*100)/100);
    })
    // details.style.display = ""
}
