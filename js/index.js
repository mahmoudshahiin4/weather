
// search
let search = document.getElementById("search");

//todat data 
let todayDateName = document.getElementById("todayDateName");
let todayDateNumber = document.getElementById("todayDateNumber");
let todayDateMonth = document.getElementById("todayDateMonth");
let locationCity = document.getElementById("locationCity");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionStatus = document.getElementById("todayConditionStatus");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("windSpeed");
let windDirection = document.getElementById("windDirection");

// next days data 
let nextDateName = document.getElementsByClassName('nextDateName')
let nextConditionImg = document.getElementsByClassName('nextConditionImg')
let nextMaxTemp = document.getElementsByClassName('nextMaxTemp')
let nextMinTemp = document.getElementsByClassName('nextMinTemp')
let nextConditionStatus = document.getElementsByClassName('nextConditionStatus')

// Api data 
async function getData (locationName){
    let data =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f20b2c8541da46489f8174133242711&q=${locationName}&days=3`);
    let finalData = await data.json();
   
    return finalData
    
    
}; 

// display today
function displayToday(data){
    locationCity.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute('src','http:'+data.current.condition.icon)
    todayConditionStatus.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity +`%`
    windSpeed.innerHTML = data.current.wind_kph
    windDirection.innerHTML = data.current.wind_dir
    
};

// display next 
function displayNext(data){
    let forecastAll = data.forecast.forecastday
   for(let i=0 ; i<2; i++){
    let nextDate = new Date(forecastAll[i+1].date);
    nextDateName[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
    nextMaxTemp[i].innerHTML = forecastAll[i+1].day.maxtemp_c
    nextMinTemp[i].innerHTML = forecastAll[i+1].day.mintemp_c
    nextConditionStatus[i].innerHTML = forecastAll[i+1].day.condition.text
    nextConditionImg[i].setAttribute('src','http:'+forecastAll[i+1].day.condition.icon)
   }

};

// display date 
function displayDate(){
    let todayDate = new Date();
    todayDateName.innerHTML = todayDate.toLocaleDateString('en-US',{weekday:"long"});
    todayDateNumber.innerHTML = todayDate.getDate();
    todayDateMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});

};



// display all 
  async function displayAll(locationName="lond"){
    let finalData = await getData(locationName);
    if(!finalData.error ){
        displayToday(finalData);
        displayNext(finalData);
        displayDate();
    }
        
   
};
displayAll();

// realtime search
search.addEventListener('input' , function(){
    displayAll(search.value);
    
});


//Geolocation
function getUserLocation() {  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(async (position) => {  
            const { latitude, longitude } = position.coords;  

            fetch(`https://api.opencagedata.com/geocode/v1/json?key=042a322b8cfe4aa9a8cd145e7118e241&q=${latitude}+${longitude}&pretty=1`)
            .then(response => response.json())
            .then(data => {
                const city = data.results[0].components.city || data.results[0].components.town;
                displayAll(city)
                // console.log(city);
            })

        }, (error) => {  
            console.error("Geolocation error:", error);  
            displayAll();  
        });  
    } else {  
        console.error("Geolocation is not supported by this browser.");  
        displayAll();  
    }  
}   
getUserLocation();  

