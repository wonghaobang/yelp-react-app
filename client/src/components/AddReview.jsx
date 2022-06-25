import React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import RestaurantFinder from "../axios/RestaurantFinder"

const AddReview = ({ rerender, setRerender }) => {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("Rating")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !reviewText || rating === "Rating") {
      console.log("bad input in AddReview component")
      return
    }

    try {
      const response = await RestaurantFinder.post(`/${id}/review`, {
        name: name,
        review: reviewText,
        rating: rating,
      })
      console.log(response)
      setRerender(!rerender)
      setName("")
      setReviewText("")
      setRating("Rating")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-2 mb-5 border border-primary rounded-lg p-3">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="form-control"
            placeholder="Type your review here..."
          ></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default AddReview
