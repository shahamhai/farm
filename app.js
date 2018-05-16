const express = require("express");
const bodyParser = require("body-parser");
const sessions = require("client-sessions");
const passport = require("passport");
const path = require("path");
const { port } = require("./config/keys");
const cors = require("cors");
const routes = require("./routs/routes");

const app = express();

//general settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//allow cros origin
app.use(cors());

//set session
app.use(sessions({
    cookieName: 'loginSession',
    secret: 'iddqd', //toDo create secret in /config/keys.js
    duration: 3 * 60 * 60 * 1000,
    activeDuration: 1 * 60 * 60 *1000,
    cookie: {
        ephemeral: false, // when true, cookie expires when the browser closes
        httpOnly: true, // when true, cookie is not accessible from javascript
        secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//routes settings
app.use('/', routes);

// set pubilc folder
//app.use(express.static(__dirname, 'public'));

app.listen(port, () => {
    console.log('server listening on port: ', port);
});