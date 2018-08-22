CREATE TABLE "movies" (
	"id" serial primary key,
	"title" varchar(120) not null, 
	"release_date" date not null, 
	"run_time" int not null, 
	"image_url" varchar(250),
    "genre_id" int references "genres" not null
);

CREATE TABLE "genres" (
	"id" serial primary key,
	"genre" varchar(50) not null,
);

INSERT INTO "genres" ("genre") 
VALUES ('action'), ('horror'), ('musical'), ('comedy'), ('fantasy'), ('science fiction'), ('drama'), ('children/family'), ('documentary'), ('romantic comedy'), ('western'); 

SELECT "movies"."title", "movies"."release_date", "movies"."run_time", "movies"."image_url", "genres"."genre" 
FROM "movies" 
JOIN "genres" ON "movies"."genre_id" = "genres"."id"; 

