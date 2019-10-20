require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    axios = require('axios');
    ethRoutes=require('./routes/ethRoutes')
const app = express();
// const doit = require('./seed');
//=======================
// MIDDLEWARE
//=======================

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//=======================
// DATABASE CONFIG
//=======================

let mongo_uri;

if (process.env.LOCALDEV === 'true') {
    mongo_uri = 'mongodb://localhost/perfest';
} else {
    mongo_uri = process.env.DATABASE_URL;
}

// mongoose.connect(mongo_uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
//     .then(() => console.log("Database connected"))
//     .catch(console.log);
// doit();
//=======================
// ALLOW-CORS
//=======================
// For development
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

//=======================
// ROUTES
//=======================

// recieve sms and call the related route

//=======================
// STARTING THE SERVER
//=======================
app.use('/getSms',ethRoutes);
app.get('/', (req, res) => {
    console.log(req.body)
    res.send("helllo fellas")
});

// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });

const port = process.env.PORT || 5555;
app.listen(port, () => {
    console.log('App listening on port ' + port);
    // bot.on('message', (msg) => {
    //     console.log(msg)
    //     const chatId = msg.chat.id;
    //     bot.sendMessage(chatId, 'Received your message');
    // });
    
});