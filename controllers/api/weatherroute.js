const {Router} = require("express");
// const axios = require("axios")
const apiKey = "2a962a7b9345f5d3ab23257ed8d563d6";

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

let router = Router();

router.get('/city/:city_name/day/:day', async (req, res) => {
    let locData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params['city_name']}&appid=${apiKey}`);
    //console.log(locData.data);

    let lon = locData.data.coord.lon;
    let lat = locData.data.coord.lat;

    let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

    console.log(weatherResponse);

    let index = parseInt(req.params['day']);

    //res.json(weatherResponse.data);
    res.render("weather",
        {
            city: req.params['city_name'],
            high: weatherResponse.data.daily[index].temp.max,
            low: weatherResponse.data.daily[index].temp.min,
            morn: weatherResponse.data.daily[index].temp.morn,
            eve: weatherResponse.data.daily[index].temp.eve,
            dayTemp: weatherResponse.data.daily[index].temp.day,
            night: weatherResponse.data.daily[index].temp.night,
            humidity: weatherResponse.data.daily[index].humidity,
            day: `${index + 1} days out`
        });
})

module.exports = {weatherRouter: router}