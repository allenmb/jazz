document.getElementById("player_submit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("player_name").value;
    if (value === "")
        return;
    console.log(value);

    /* Get Current Weather */

    const url = "https://www.balldontlie.io/api/v1/players?q=" + value;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let results = "";
            /*results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img class="wthr-img" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            results += "<p>Press " + Number((json.main.pressure) / 1013.25 * 770 / 25.4).toFixed(1) + " in</p>";
            results += "<p>Wind " + json.wind.speed + " mph  <img src='/images/arrow.png' height='15' style=transform:rotate(" + json.wind.deg + "deg);></p>";
            document.getElementById("weatherResults").innerHTML = results;*/
        });

    /* Get 5 Day Forecast */
/*
    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=2ee99ec06c8e0364cf1110a30e9bd7f0";
    fetch(url2)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let forecast = "";
            let counter = 0;
            for (let i = 0; i < json.list.length; i++) {
                let x = moment(json.list[i].dt) - 1549670400;
                if (x % 86400 === 0 || i === 0) {
                    counter++;
                    if (counter != 1) {
                        forecast += "</div>";
                    }
                    if (i != (json.list.length - 1)) {
                        forecast += "<div class='span2'><h3>" + moment(json.list[i].dt_txt).format('MMMM Do') + "</h3>";
                    }
                }
                forecast += "<h5>" + moment(json.list[i].dt_txt).format('h a') + "</h5>";
                forecast += '<img class="wthr-img" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
                forecast += "<p>Temp " + json.list[i].main.temp + " &deg;F</p>";
                forecast += "<p>Press " + Number((json.list[i].main.pressure) / 1013.25 * 770 / 25.4).toFixed(1) + " in</p>";
                forecast += "<p>Wind " + json.list[i].wind.speed + " mph  <img src='/images/arrow.png' height='15' style=transform:rotate(" + json.list[i].wind.deg + "deg);></p>";
                if (i === (json.list.length - 1)) {
                    forecast += "</div>";
                }
                x = 0;
            }
            console.log(forecast);
            document.getElementById("forecastResults").innerHTML = forecast;
        });*/
});
