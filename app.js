



// ----------------------------------------------
// Här finns de olika variable och selector

let apiKey = '6653df7a717bee87ba87ec3fe197ef8d';
let stadNamn, url, iconId, temperatur;
let container = document.querySelector('.container');
let TheForm = document.querySelector('.weather-form');
let textInput = document.querySelector('#text-input');
let submitInput = document.querySelector('#submit-input');
let htmlName = document.querySelector('.top-contain h1:nth-child(1)')
let htmlTempoAndErr = document.querySelector('.top-contain h1:nth-child(2)')
let htmlIcon = document.querySelector('.bottom-contain img')
let htmlDiscrip = document.querySelector('.bottom-contain :nth-child(3)');
let htmlVind = document.querySelector('.bottom-contain :nth-child(2)');
let htmlFuktighet = document.querySelector('.bottom-contain :nth-child(4)');

// ----------------------------------------------
// Här gör jag addEventListener för knappen submit för att ändra på url och för kalla fucction weather();

submitInput.addEventListener('click', event => {
    event.preventDefault();
    stadNamn = textInput.value;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${stadNamn}&appid=${apiKey}&lang=sv&units=metric`;
    weather();
});



// ----------------------------------------------
// Här gör jag fetch för api för att visa de info vi vill ,
/*            och för att visa ett error meddelande när man skriver fel stad 
eller när det händer något fel med länken(t.ex: med API). */

let weather = () => {
    fetch(url).then((response) => {
        if (response.status == 404) {
            throw 'Staden kunde inte hittas';
        }
        else if (response.status === 401) {
            throw response.statusText;/* med throw skcikar vi del meddelande till catch */
        }
        else return response.json();

    })
        .then((data) => {
            htmlName.innerHTML = data.name;
            temperatur = Math.floor(data.main.temp);
            temperaturFunc();
            htmlTempoAndErr.innerHTML = `${temperatur} °C`;
            iconId = data.weather[0].icon;
            htmlIcon.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`
            htmlDiscrip.innerHTML = data.weather[0].description;
            htmlVind.innerHTML = `Vindhastighet: ${data.wind.speed}`;
            htmlFuktighet.innerHTML = `Luftfuktighet: ${data.main.humidity}`


/*  Här tar bort jag allt gamla info från sidan och visar istället bara det fel meddelandet som vi fick */
        }).catch((x) => {
            htmlName.innerHTML = '';
            htmlTempoAndErr.innerHTML = x;
            htmlIcon.src = ``
            htmlDiscrip.innerHTML = '';
            htmlVind.innerHTML = ``
            htmlFuktighet.innerHTML = ``;
        });
}



/* Här är fuction för att ändra färgar i texten enligt temperaturen, alltså om temperatur >= 17 

eller temperatur < 17 && temperatur > 7 eller temperatur <= 7*/

let temperaturFunc = () => {
    console.log(temperatur);
    let root = document.documentElement;
    if (temperatur >= 17 ){
        root.style.setProperty('--contain-color', 'rgba(235, 68, 39, 0.755)');
    }
    else if (temperatur < 17 && temperatur > 7){
        root.style.setProperty('--contain-color', 'rgba(209, 235, 39, 0.755)');
    }
    else if (temperatur <= 7){
        root.style.setProperty('--contain-color', 'rgba(39, 68, 235, 0.755)');
    }

}
