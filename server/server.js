const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const movies = require('./routers/movies-router.js'); 

const port = process.env.PORT || 5000; 

app.use(express.static('server/public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/movies', movies);

app.listen(port, ()=>{
    console.log('server is up on:', port);
})