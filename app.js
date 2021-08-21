//server
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');

const connection = require('./dbconnect');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ 
    extended : false
}));
app.use(bodyparser.json());

app.use(session( {
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//routes
const auth = require('./router/auth');
const prod = require('./router/prod');


//index
app.get('/', function(req, res) {
    let loggedin = req.session.loggedin;
    res.render('index', {
        loggedin : loggedin
    });
});


//confirmation
app.get('/confirmation', function(req, res) {
    res.render('confirmation');
});

//checkout
app.get('/checkout', function(req, res) {
    res.render('checkout');
});

//about
app.get('/about', function(req, res) {
    let loggedin = req.session.loggedin;
    res.render('about',  {
        loggedin : loggedin
    });
});


app.use('/auth', auth);
app.use('/prod', prod);



app.listen(PORT, console.log("server on port 5000"));