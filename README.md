# What Should We Watch?
## Description: 
A SEAN stack (SQL, Express, AngularJS, and Node) movie collection web app. 

## Built With
* PostgreSQL
* AngularJS
* NodeJS
* Express
* Angular Material

## Getting Started

1. Fork and clone this repository 
2. Create a database called "movie_collection" 
3. Create tables  
    `CREATE TABLE "movies" (`
	`"id" serial primary key,`
	`"title" varchar(120) not null, `
	`"release_date" date not null,`
	`"run_time" int not null, `
	`"image_url" varchar(250) default '../images/vhs.png',`
    `"genre_id" int references "genres" not null,`
	`"ranking" int, `
	`"favorite" boolean`
`);`

   `  CREATE TABLE "genres" (`
`	  "id" serial primary key,`
`	  "genre" varchar(50) not null, `
`);`
4. Set "movies"."genre_id" to "CASCADE" on delete and on update within Postico. 
5. `npm install `

## Screenshots
Dashboard View: 
![Screen Shot of Dashboard View](https://github.com/larsz-o/movie_collection/blob/master/server/public/images/screenshot.png)

## Completed Features
- [x] Users can add movies they'd like to watch to the collection.
	- [x] Data collected includes: title, genre, run time, release date, and an image URL.
	- [x] Movies are displayed on cards below the 'Add a Movie' form. 
- [x] Users can enter their own genres on the "Genres" view. 
	- [x] New genres are made available within the "Dashboard" view when submitting a new movie. 
- [x] Each movie entry can be ranked by clicking on the thumbs up/thumbs down icons. Movies can be ranked from 0-10. 
- [x] Each movie can also be favorited by clicking on the heart icon in the top right portion of the display card. 
	- [x] Favorited status can be toggled by clicking the heart icon. 
	- [x] A movie can also be removed from favorites in the "Favorites" view. 
- [x] Data about movie rankings and favorite status is stored in the database and visually visible on the card itself. 
- [x] Favorited movies also appear on a separate "Favorites" view, in a table containing every favorited movie. 
- [x] Movies can be edited or deleted.
- [x] Genres can similarly be edited or deleted. 
- [x] If a user would like to delete a genre, but there are movies in the collection with that genre, users will need to confirm this choice. All movies in this genre will be deleted if confirmed. 
- [x] Movies can be searched by genre or title on the "Dashboard" view. They can also be filtered by any of their properties: run time, release date, ranking, or favorited status. 

## Next Steps
- [ ] Create user accounts to allow multiple individuals to add, edit, favorite, and rank movies. 
- [ ] Allow users to see each others' rankings to help decide what to watch as a couple or group. 
- [ ] Add information about where the movie can be accessed (in a personal DVD collection, on Netflix, etc.). 
- [ ] Display each movie on its own page containing all reports about rankings and user lists. 
- [ ] Allow users to upload their own pictures and connect an image search API to the image URL input field. 