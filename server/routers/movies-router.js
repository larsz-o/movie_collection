const express = require('express'); 
const router = express.Router(); 
const pool = require('../modules/pool.js'); 

//GET routes

//POST routes

router.post('/', (req, res)=>{
    console.log('in movies POST route');
    const newMovie = req.body; 
    const query = `INSERT INTO "movies" ("title", "release_date", "run_time", "image_url", "genre_id") 
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(query, [newMovie.title, newMovie.release_date, newMovie.run_time, newMovie.image_url, newMovie.genre_id]).then(()=>{
        res.sendStatus(201); 
    }).catch((error)=>{
        console.log('Error posting movie', error);
        res.sendStatus(500); 
    })
})//end POST movie route 

//DELETE routes
//PUT routes 

module.exports = router; 