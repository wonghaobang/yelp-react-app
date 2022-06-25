import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RestaurantFinder from "../axios/RestaurantFinder"
import AddReview from "../components/AddReview"
import Reviews from "../components/Reviews"
import StarRating from "../components/StarRating"

const RestaurantDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  // the rerender state does not matter, I just want it to change state every time I add a review
  const [rerender, setRerender] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)
        console.log(response)
        console.log("re-render RestaurantDetailPage component")
        setSelectedRestaurant(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [rerender])

  return (
    <>
      {selectedRestaurant && (
        <>
          <h1
            className="display-4 text-center"
            onClick={() => navigate("/")}
            role="button"
          >
            {selectedRestaurant.restaurant.name}
          </h1>

          <div className="text-center mb-3">
            <StarRating
              rating={parseFloat(selectedRestaurant.restaurant.average_rating)}
            />
            <span>({selectedRestaurant.restaurant.review_count})</span>
          </div>

          <Reviews selectedRestaurant={selectedRestaurant} />

          <AddReview rerender={rerender} setRerender={setRerender} />
        </>
      )}
    </>
  )
}

export default RestaurantDetailPage
