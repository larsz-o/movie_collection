const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//GET route
router.get('/', (req, res)=>{
    console.log('in genre GET route');
    const query = `SELECT "genres"."id", "genres"."genre", COUNT("movies"."genre_id") FROM "genres" LEFT JOIN "movies" ON "genres"."id" = "movies"."genre_id" 
    GROUP BY "genres"."genre", "genres"."id" ORDER BY count DESC;`; 
    pool.query(query).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error getting genres', error);
        res.sendStatus(500); 
    })
})
//POST route
router.post('/', (req, res)=>{
    console.log('in genre POST route');
    const newGenre = req.body.genre;
    console.log(newGenre); 
    const query = `INSERT INTO "genres" ("genre") VALUES ($1);`;
    pool.query(query, [newGenre]).then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.log('Error posting new genre', error);
        res.sendStatus(500); 
    })
})// end genre POST route

router.delete('/:id', (req, res)=>{
    console.log('in genre DELETE route');
    const genreToDelete = req.params.id;
    console.log(genreToDelete); 
    const query = `DELETE FROM "genres" WHERE "id" = $1;`;
    pool.query(query, [genreToDelete]).then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('Error deleting genre', error);
        res.sendStatus(500);   
    })
})//end genre DELETE route 

module.exports = router; 