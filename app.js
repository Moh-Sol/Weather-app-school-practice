
let apiKey = '6653df7a717bee87ba87ec3fe197ef8d';
let stadNamn, url, iconId;
let container = document.querySelector('.container');
let TheForm = document.querySelector('.weather-form');
let textInput = document.querySelector('#text-input');
let submitInput = document.querySelector('#submit-input');
let htmlName = document.querySelector('.top-contain h1:nth-child(1)')
let htmlTempo = document.querySelector('.top-contain h1:nth-child(2)')
let htmlIcon = document.querySelector('.bottom-contain img')
let htmlDiscrip = document.querySelector('.bottom-contain :nth-child(3)');
console.log(htmlDiscrip)



submitInput.addEventListener('click', event => {
    event.preventDefault();
    stadNamn = textInput.value;
    console.log(stadNamn);
    url = `http://api.openweathermap.org/data/2.5/weather?q=${stadNamn}&appid=${apiKey}&lang=sv&units=metric`;
    weather();
});



let weather = () => {
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.weather[0].description);
        console.log(data.main.temp);
        htmlName.innerHTML = stadNamn;
        htmlTempo.innerHTML=`${data.main.temp}°C`;
        iconId= data.weather[0].icon;
        htmlIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`
        htmlDiscrip.innerHTML = data.weather[0].description;
    })
}

