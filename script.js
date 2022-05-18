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
let div1 = document.querySelector('.div1');



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
            // console.log(data);
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
    press.innerHTML = "Pressure : " + data.main.pressure +" hPa"
    SeaLevel.innerHTML = "Sea Level : " + data.main.sea_level
    Sunrise.innerHTML = "Sunrise : " + sr1
    Sunset.innerHTML = "Sunset : " + ss1

    // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API}`).then(res => res.json()).then(data => {
    fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API}`).then(res => res.json()).then(data1 => {
            console.log(data1.list[0].components);
            let air = data1.list[0].components
            // console.log(Math.round((data.main.temp - 273.15)*100)/100);
            
            div1.innerHTML = `
            <div class="p">
            <h3 ><u style="margin-bottom: 1rem;">Air Pollution</u></h3>
            <p> Carbon monoxide : ${air.co} μg/m3</p>
            <hr>
            <p> Nitrogen monoxide : ${air.no} μg/m3</p>
            <hr>
            <p> Nitrogen dioxide : ${air.no2} μg/m3</p>
            <hr>
            <p> Ozone : ${air.o3} μg/m3</p>
            <hr>
            <p> Sulphur dioxide :${air.so2} μg/m3</p>
            <hr>
            <p> Fine particles matter : ${air.pm2_5} μg/m3</p>
            <hr>
            <p> Coarse  matter : ${air.pm10} μg/m3</p>
            <hr>
            <p> Ammonia : ${air.nh3} μg/m3</p>
            
            
            </div>`        
        })




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
        // console.log(data);


        settimedate(data);
        // console.log(Math.round((data.main.temp - 273.15)*100)/100);
    })
    // details.style.display = ""
}
