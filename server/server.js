require("dotenv").config()
const express = require("express")
const db = require("./db")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))
}

// Get All Restaurants
app.get("/api/v1/restaurants", async (req, res, next) => {
  const { q } = req.query
  try {
    const results = await db.query(
      "SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, TRUNC(AVG(reviews.rating),1) AS average_rating, COUNT(reviews.rating) AS review_count FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id ORDER BY restaurants.id"
    )

    const filteredResults = results.rows.filter((item) =>
      [item.name, item.location].join(" ").toLowerCase().includes(q)
    )

    res.status(200).json({
      status: "success",
      results: filteredResults.length,
      data: {
        restaurants: filteredResults,
      },
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await db.query(
      "SELECT restaurants.id, restaurants.name, restaurants.location, restaurants.price_range, TRUNC(AVG(reviews.rating),1) AS average_rating, COUNT(reviews.rating) AS review_count FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id GROUP BY restaurants.id HAVING restaurants.id = $1",
      [req.params.id]
    )

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY ID",
      [req.params.id]
    )

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

// Create Restaurant
app.post("/api/v1/restaurants", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    )
    res.status(201).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurant: result.rows[0],
      },
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

// Update Restaurant
app.put("/api/v1/restaurants/:id", async (req, res, next) => {
  try {
    const result = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    )
    res.status(200).json({
      status: "success",
      results: result.rows.length,
      data: {
        restaurant: result.rows[0],
      },
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res, next) => {
  try {
    await db.query("DELETE FROM reviews WHERE restaurant_id = $1 RETURNING *", [
      req.params.id,
    ])
    await db.query("DELETE FROM restaurants WHERE id = $1 RETURNING *", [
      req.params.id,
    ])
    res.status(204).json({
      status: "success",
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

// post a Review of a Restaurant
app.post("/api/v1/restaurants/:id/review", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    )
    res.status(201).json({
      status: "success",
      results: result.rows.length,
      data: {
        review: result.rows[0],
      },
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
})

app.use((err, req, res, next) => {
  const statusCodeToUse = res.statusCode ? res.statusCode : 500
  res.status(statusCodeToUse).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
})

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`)
})
