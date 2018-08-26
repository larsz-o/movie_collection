const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET routes
router.get('/', (req, res) => {
    console.log('in movies GET route');
    const query = `SELECT "movies"."id", "movies"."title", "movies"."release_date", "movies"."run_time", "movies"."image_url", "genres"."genre", "movies"."ranking", "movies"."favorite" FROM "movies" 
    JOIN "genres" ON "movies"."genre_id" = "genres"."id" ORDER BY "movies"."id" DESC;`;
    pool.query(query).then((results) => {
        console.log(results);
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error making GET request', error);
        res.sendStatus(500);
    })
})// end GET movies route

//POST routes
router.post('/', (req, res) => {
    console.log('in movies POST route');
    const newMovie = req.body;
    console.log(newMovie);
    const query = `INSERT INTO "movies" ("title", "release_date", "run_time", "image_url", "genre_id", "ranking", "favorite") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(query, [newMovie.title, newMovie.release_date, newMovie.run_time, newMovie.image_url, newMovie.genre_id, newMovie.ranking, newMovie.favorite]).then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('Error posting movie', error);
        res.sendStatus(500);
    })
})//end POST movie route 

//DELETE routes
router.delete('/:id', (req, res) => {
    console.log('in movies DELETE route'); 
    const movieToDelete = req.params.id;
    console.log(movieToDelete); 
    const query = `DELETE FROM "movies" WHERE "id" = $1;`;
    pool.query(query, [movieToDelete]).then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error deleting movie', error);
        res.sendStatus(500); 
    })
})//end DELETE movie route 
//PUT routes 
router.put('/:id', (req, res)=>{
    console.log('in movies PUT route');
    const movieToEdit = req.params.id; 
    const detailsToEdit = req.body;
    const query = `UPDATE "movies" SET "ranking" = $1, "favorite" = $2 WHERE "id" = $3;`;
    pool.query(query, [detailsToEdit.ranking, detailsToEdit.favorite, movieToEdit]).then((response)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error updating movie', error);
        res.sendStatus(500);
    })
})//end update all categories PUT route

router.put('/update/:id', (req, res)=>{
    console.log('in movies PUT route');
    const movieToEdit = req.params.id; 
    const detailsToEdit = req.body;
    const query = `UPDATE "movies" SET "title" = $1, "release_date" = $2, "run_time" = $3, "image_url" = $4, "genre_id" = $5 WHERE "id" = $6;`;
    pool.query(query, [detailsToEdit.title, detailsToEdit.release_date, detailsToEdit.run_time, detailsToEdit.image_url, detailsToEdit.genre_id, movieToEdit]).then((response)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error updating movie', error);
        res.sendStatus(500);
    })
})
module.exports = router; 