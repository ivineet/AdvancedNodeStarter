//Application for late customisation
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

//use models here
require('./models/Configdata');
require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(keys.mongoURI, { useMongoClient: true }, function(error) {
  if (error) {
    console.log(error)
    throw error;
  }
  console.log("Database connected");
});

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/configDataRoutes')(app);

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  console.log('get /');
  res.send('Welcome to Late customisation App')

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
