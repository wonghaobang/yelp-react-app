import React, { useState, useEffect } from "react"
import RestaurantFinder from "../axios/RestaurantFinder"
import RestaurantList from "../components/RestaurantList"

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await RestaurantFinder.get(`?q=${query}`)
        console.log(response)
        console.log("re-render home component")
        setRestaurants(response.data.data.restaurants)
      } catch (error) {
        console.log(error)
      }
    }
    getRestaurants()
  }, [query])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !location || priceRange === "Price Range") {
      console.log("bad input in Home component")
      return
    }

    try {
      const response = await RestaurantFinder.post("/", {
        name: name,
        location: location,
        price_range: priceRange,
      })
      setRestaurants([...restaurants, response.data.data.restaurant])
      setName("")
      setLocation("")
      setPriceRange("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className="display-3 text-center">Eat Now</h1>

      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="location"
              />
            </div>
            <div className="col">
              <select
                className="custom-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>

      <div className="input-group mb-3 w-50 mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          className="form-control"
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <span className="pr-1">Search</span>
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>

      <RestaurantList
        restaurants={restaurants}
        setRestaurants={setRestaurants}
      />
    </>
  )
}

export default Home
