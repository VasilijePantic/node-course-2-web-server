const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT  || 3000;
var app = express();

//partials config
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware - IS CALLED IN THE ORDER OF app.use
    // in the req object - we can extract all data about a client who makes a request
app.use((req, res, next) => {//next exists to tell express that middleware function is done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {// fs.appendFile will automatically create the file
        if(err){// server.log file will save all our log info
            console.log('Unable to append to server.log');
        }
    }); // \n - goes to a new line
    next();
});

// // MAINTENANCE MIDDLEWARE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public')); // this is bellow maintenance so it can't be called earlier


// hbs helper - something like a middleware
    // takes 2 args
hbs.registerHelper('getCurrentYear', () => {// 1st arg - name of the function
    return new Date().getFullYear();    // function itself
});

hbs.registerHelper('screamIt', () => { // ERROR text.toUpperCase() for some reason does not work
    return text.toUpperCase();// to tired to do shiet
});

// ROOT
app.get('/', (req, res) => {
    res.render('home.hbs', {
        string: 'bitch i might be',
        pageTitle: 'Home page',
    });
});

// /ABOUT
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

// /PROJECTS
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

// /BAD
app.get('/bad', (req, res) => {
    res.send({
        error: [
            'Unable to do whateva',
            'Cash me ouside howbow daaah'
        ]
    });
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});