import axios from "axios"

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wbdv-yelp-app-full.herokuapp.com/api/v1/restaurants"
    : "http://localhost:4000/api/v1/restaurants"

const RestaurantFinder = axios.create({
  baseURL: API_URL,
})

export default RestaurantFinder
