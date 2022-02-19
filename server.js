const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cron = require('node-cron');
const {sendEmail} = require('./utils/sendEmail.js');
const { Events, User, Rsvp} = require('./models');
const request = require('postman-request');

const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3307;

const helpers = {};

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({helpers });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Now listening");
  cron.schedule('* * */23 * * *', async function() {
  console.log('running a task every 23 hours');
  ;
  const eventData = await Events.findAll(
    {include: Rsvp}
  );
  let emails = [];
  const events = eventData.map((event) => event.get({plain: true}));
  for (let i = 0; i < events.length; i++){
    const event = events[i];
    let rsvps = events[i].rsvps;
    emails.length = 0;
    let userIds = rsvps.map((rsvp)=>{
      return {user_id: rsvp.user_id}
    });
    
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const userData = await User.findByPk(userId.user_id);
      const user = userData.get({plain: true});
      if(user.email){
      emails.push(user.email);  
      }
      
     
    }
    console.log(emails);
    let eventDate = new Date(event.event_date);
    let today = new Date(Date.now())
    let oneDay = 1000 * 60 * 60 * 24;
    let daysOut = Math.floor(((eventDate - today)/oneDay));
    if (daysOut < 6){
    request(`http://localhost:3307/api/weather/${event.location_city}/${daysOut}`, async function (error, response, body) {
        if (error){console.log('error:', error);}; // Print the error if one occurred
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body);
      if(body){
        body = JSON.parse(body);
       function kelvintocelsius(kelvin){
          let celsius = kelvin - 273.15;
          return celsius;
      
      }
      function  celsiustofahrenheit(celsius){
          let fahrenheit = celsius * 9/5 + 32;
          return fahrenheit;
      
      }
      function kelvintofahrenheit (kelvin){
          return Math.floor(celsiustofahrenheit(kelvintocelsius(kelvin)));
          
      }
      let high = kelvintofahrenheit(body.temp.max);
      let low = kelvintofahrenheit(body.temp.min);
      await sendEmail(emails, `Weather Update for ${event.title}`, `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Weather for ${event.title}</title>
        </head>
        <body>
         <h1>Your Weather Update for ${event.title}</h1>
        
        <h2>${event.location_city}: ${event.event_date}</h2>
        
        <p>Expected Weather: ${body.weather[0].main}: ${body.weather[0].description}</p>
        <p>High: ${high}°F </p>
        <p>Low: ${low}°F </p>
        
        <h2>Enjoy your time at ${event.title}</h2>   
        </body>
        </html>` )

         
      }
      
      });
    } 
  }
});
}
  );
});
