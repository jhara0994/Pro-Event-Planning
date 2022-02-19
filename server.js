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
  cron.schedule('*/5 * * * * *', async function() {
  console.log('running a task every 5 seconds');
  ;
  const eventData = await Events.findAll(
    {include: Rsvp}
  );
  const events = eventData.map((event) => event.get({plain: true}));
  
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    let eventDate = new Date(event.event_date);
    let today = new Date(Date.now())
    let oneDay = 1000 * 60 * 60 * 24;
    let daysOut = Math.floor(((eventDate - today)/oneDay));
    if (daysOut < 6){
    request(`http://localhost:3307/api/weather/${event.location_city}/${daysOut}`, function (error, response, body) {
        if (error){console.log('error:', error);}; // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
      });
    }
    

    
  }
});
}
  );
});
