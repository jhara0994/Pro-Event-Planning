const router = require("express").Router();
const { User, Events, Weather, Photo, Rsvp } = require("../models");
const withAuth = require("../utils/auth.js");
const axios = require('axios');
const WeatherApiKey = "2a962a7b9345f5d3ab23257ed8d563d6";


// Todo: GET route to show all events on homepage
router.get("/", async (req, res) => {
  try {
    const eventData = await Events.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
    });

    const events = eventData.map((Events) => Events.get({ plain: true }));
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["id", "name"],
      },
    });

    const events = eventData.get({ plain: true });
      let eventDate = new Date(events.event_date);
      const month = eventDate.toLocaleString('default', { month: 'long' });
      let formattedDate = `${month} ${eventDate.getDate()}, ${eventDate.getFullYear()} `;
      let formattedTime = `${eventDate.toLocaleTimeString()}`;
      
      
      let cityName = events.location_city //TODO How do we know where the user is or where the event is?

      let locData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherApiKey}`);
      //console.log(locData.data);
  
      let lon = locData.data.coord.lon;
      let lat = locData.data.coord.lat;
  
      let weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WeatherApiKey}`);
  
      console.log(weatherResponse);
      let today = new Date(Date.now())
      let daysOut = eventDate.getDate() - today.getDate() //TODO: TEST THIS.
      function kelvintocelsius(kelvin){
        let celsius = kelvin - 273.15;
        return celsius;
    
    }
    function  celsiustofahrenheit(celsius){
        let fahrenheit = celsius * 9/5 + 32;
        return fahrenheit;
    
    }
    function kelvintofahrenheit (kelvin){
        return celsiustofahrenheit(kelvintocelsius(kelvin));
        
    }


    res.render("event", {
      data:{
      events,
      formattedDate,
      formattedTime,
      loggedIn: req.session.loggedIn,
      userId: req.session.user_id,

      city: req.params['city_name'],
      high: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.max).toString().substring(0,4),
      low: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.min).toString().substring(0,4),
      morn: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.morn).toString().substring(0,4),
      eve: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.eve).toString().substring(0,4),
      dayTemp: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.day).toString().substring(0,4),
      night: kelvintofahrenheit(weatherResponse.data.daily[daysOut].temp.night).toString().substring(0,4),
      humidity: kelvintofahrenheit(weatherResponse.data.daily[daysOut].humidity).toString().substring(0,4),
    }
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// router.post('/registration/:event_id/:user_id', async (req, res) =>{
//   try {
//     const newRsvp = Rsvp.create({
//       user_id: req.params.user_id,
//       event_id: req.params.event_id
//     });
//     res.status(200).json(newRsvp);
//   } catch (err) {
//     res.status(500);
//   }
// })


// Todo: GET route to redirect for login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

