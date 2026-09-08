let search=document.getElementById("search");
let btn=document.getElementById("btn");
let result=document.getElementById("result");
let historyList=document.getElementById("history");

btn.addEventListener("click",citysearch);
 search.addEventListener("keypress",function(event){
        if(event.key==="Enter"){
            citysearch();
        }
    });
    let history=[];

    function citysearch(){
    let city=search.value.trim();
    if(city===""){
        alert("Please enter City");
        search.focus();
        return;
       

    }
let apikey="f44afccd96d3b468b79b8c11ec43976d";


let url=
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
result.innerHTML="<h3>🔍Searching..</h3>";


fetch(url)
.then(response=>response.json())
.then(data=> {
    console.log(data);
    if(data.cod==404){
    result.textContent="City not found!";
    return;
    }
 
    let icon=`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    let weather=data.weather[0].main;

    if(weather==="Clear"){
        document.body.style.background="linear-gradient(to right,#56CCF2,#2F80ED)";
    }
    else if(weather==="Clouds"){
         document.body.style.background =
    "linear-gradient(to right,#bdc3c7,#2c3e50)";

    }
    else if(weather === "Snow") {
    document.body.style.background =
    "linear-gradient(to right,#E6F7FF,#B8DFFF)";
}
else if (weather === "Mist" || weather === "Fog" || weather === "Haze") {
    document.body.style.background =
    "linear-gradient(to right,#d7d2cc,#304352)";
}
else if (weather === "Thunderstorm") {
    document.body.style.background =
    "linear-gradient(to right,#232526,#414345)";
}
    else if(weather==="Rain"){
         document.body.style.background =
    "linear-gradient(to right,#4b79a1,#283e51)";

    }
    else{
         document.body.style.background =
    "linear-gradient(to right,#7F7FD5,#86A8E7,#91EAE4)";

    }

    let emoji="";

if(weather==="Clear"){
    emoji="☀";
}
else if(weather==="Clouds"){
    emoji="☁";
}
else if(weather==="Rain"){
    emoji="🌧";
}
else if(weather==="Snow"){
    emoji="❄";
}
else{
    emoji="🌈";
}

let advice="";

if(weather==="Rain"){
    advice="🌂 Carry an umbrella.";
}
else if(weather==="Clear"){
    advice="😎 Great day to go outside.";
}
else if(weather==="Clouds"){
    advice="☁ Pleasant weather.";
}
else{
    advice="🌤 Have a nice day!";
}



   

result.innerHTML=
`<br><h2>${emoji}${data.name}</h2>
<img src="${icon}">

<p>🌡Temperature: ${data.main.temp}°C</p>
<p>☁ Weather: ${data.weather[0].main}</p>
<p>💧Humidity: ${data.main.humidity}%</p>
<p>🌬 Wind: ${data.wind.speed}m/s</p>
<p>🥵Feels like:${data.main.feels_like}°C</p>
<p>🌡Pressure: ${data.main.pressure}hPa</p>
<p>🌍 Country: ${data.sys.country}</p>
<p>${advice}</p>
<br>
`;



if(!history.includes(city)){
history.push(city);
let li=document.createElement("li");
li.textContent=city;
historyList.appendChild(li);
}

console.log(history);


let today= new Date();
document.getElementById("date").textContent=today.toLocaleString();


search.value="";
search.focus();

})

.catch(error => {
    result.innerHTML = "<h3>⚠ Unable to fetch weather.</h3>";
    console.log(error);
});
}
