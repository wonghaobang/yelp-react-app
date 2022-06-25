import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RestaurantFinder from "../axios/RestaurantFinder"

const UpdatePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response)
        setName(response.data.data.restaurant.name)
        setLocation(response.data.data.restaurant.location)
        setPriceRange(response.data.data.restaurant.price_range)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !location || !priceRange) {
      console.log("bad input in UpdatePage component")
      return
    }

    try {
      const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
        name: name,
        location: location,
        price_range: priceRange,
      })
      console.log(updatedRestaurant)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h1 className="text-center">Update Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            className="form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceRange">Price Range</label>
          <select
            className="custom-select"
            id="priceRange"
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
        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default UpdatePage
