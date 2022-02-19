const {Router} = require("express");
const axios = require("axios")
const apiKey = "2a962a7b9345f5d3ab23257ed8d563d6";

let router = Router();

router.get('/:city_name/:day', async (req, res) => {
    let locData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.params['city_name']}&appid=${apiKey}`);

    let lon = locData.data.coord.lon;
    let lat = locData.data.coord.lat;

    let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);


    let index = parseInt(req.params.day);

    res.json(weatherResponse.data.daily[index]);
    
})

module.exports = router