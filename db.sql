-- for help     \?

-- list database    \l

-- create database      CREATE DATABASE database_name

-- connect database     \c database_name

-- list all tables      \d or \dt

-- see table structure      \d restaurants



ALTER TABLE products ADD COLUMN featured BOOLEAN;
ALTER TABLE products DROP COLUMN featured;
DROP TABLE products;


CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range >= 1 and price_range <= 5)
);

INSERT INTO restaurants(name, location, price_range) VALUES ('wendys', 'new york', 4);

SELECT * FROM restaurants;

UPDATE restaurants
SET name = "KFC",
    location = "rhode island",
    price_range = 1, 
WHERE id = 4;

DELETE FROM restaurants
WHERE id = 5
RETURNING *;


CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK(rating >= 1 and rating <= 5)
);

INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ('2', 'james', 'so so', 1);


SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, TRUNC(AVG(reviews.rating),2) AS average_rating, COUNT(reviews.rating) AS review_count FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id HAVING restaurants.id = 17;


