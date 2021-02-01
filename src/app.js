const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


//define paths for experss config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handle bars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup for static directory to serve
app.use(express.static(publicDirectory));


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather station', 
        name: 'Martin'
    });
});

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me', 
        name: 'Martin'
    });
});

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help', 
        help_message: 'This is a help message'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address is required.'
        });
    }

    geocode(req.query.address, (error, {latitude,longitude, location} = {})=>{
        if(error){
            return res.send({
                error:error
            });
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error : error
                });
            }
            res.send({
                location : location, 
                forecast: forecastData,
                address: req.query.address
            });
        });
        
    });    
});

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You much provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        products:[]
    });
});

app.get('/help/*', (req, res)=>{
    res.status(404).render('404',{
        title: '404 Help article not found',
        name: 'Martin',
        message: 'The requested help article was not found.'
    });
});


app.get('*', (req, res)=>{
    res.status(404).render('404',{
        title: '404 page not found',
        name: 'Martin',
        message: 'The requested page was not found.'
    });
});

app.listen(8080, ()=>{
    console.log('server is up on port 8080');
});