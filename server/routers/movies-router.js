const express = require('express'); 
const router = express.Router(); 
const pool = require('../modules/pool.js'); 

//GET routes
router.get('/', (req, res)=>{
    console.log('in movies GET route');
    const query = `SELECT "movies"."title", "movies"."release_month", "movies"."release_day", "movies"."release_year", "movies"."run_time", "movies"."image_url", "genres"."genre" FROM "movies" 
    JOIN "genres" ON "movies"."genre_id" = "genres"."id";`;
    pool.query(query).then((results)=>{
        console.log(results);
        res.send(results.rows); 
    }).catch((error)=>{
        console.log('Error making GET request', error);
        res.sendStatus(500); 
    })
})// end GET movies route

//POST routes
router.post('/', (req, res)=>{
    console.log('in movies POST route');
    const newMovie = req.body; 
    console.log(newMovie); 
    const query = `INSERT INTO "movies" ("title", "release_month", "release_day", "release_year", "run_time", "image_url", "genre_id") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(query, [newMovie.title, newMovie.release_month, newMovie.release_day, newMovie.release_year, newMovie.run_time, newMovie.image_url, newMovie.genre_id]).then(()=>{
        res.sendStatus(201); 
    }).catch((error)=>{
        console.log('Error posting movie', error);
        res.sendStatus(500); 
    })
})//end POST movie route 

//DELETE routes
//PUT routes 

module.exports = router; 