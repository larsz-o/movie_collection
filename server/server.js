const express = require('express'); 
const bodyParser = require('body-parser'); 

const app = express(); 

const port = process.env.PORT || 5000; 

app.use(express.static('server/public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.listen(port, ()=>{
    console.log('server is up on:', port);
})