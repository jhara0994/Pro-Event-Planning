const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cron = require('node-cron');


const routes = require("./controllers");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3306;

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
  //Need to use cron.schedule to run the a weather query daily, and then send an email based on the results.
//   cron.schedule('*/5 * * * * *', function() {
//   console.log('running a task every 5 seconds');
// });
}
  );
});
