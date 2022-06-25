import React, { useContext, useEffect, useState } from "react"
import RestaurantFinder from "../axios/RestaurantFinder"
import { RestaurantsContext } from "../context/RestaurantsContext"
import { useNavigate } from "react-router-dom"
import StarRating from "./StarRating"

const RestaurantList = ({ restaurants, setRestaurants }) => {
  const navigate = useNavigate()

  const handleUpdate = (e, id) => {
    e.stopPropagation()
    navigate(`/restaurants/${id}/update`)
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((el) => {
              return (
                <tr
                  key={el.id}
                  onClick={() => navigate(`/restaurants/${el.id}`)}
                >
                  <td>{el.name}</td>
                  <td>{el.location}</td>
                  <td>{"$".repeat(el.price_range)}</td>
                  <td>
                    <StarRating rating={parseFloat(el.average_rating)} />
                    <span>({el.review_count ? el.review_count : 0})</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleUpdate(e, el.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, el.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
