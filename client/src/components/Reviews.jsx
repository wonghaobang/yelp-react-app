import React from "react"
import StarRating from "./StarRating"

const Reviews = ({ selectedRestaurant }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      {selectedRestaurant.reviews && (
        <>
          {selectedRestaurant.reviews.map((rev) => {
            return (
              <div key={rev.id} className="col mb-4">
                <div className="card text-white bg-primary h-100">
                  <div className="card-header d-flex justify-content-between">
                    <span>{rev.name}</span>
                    <span>
                      <StarRating rating={rev.rating} />
                    </span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{rev.review}</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-body">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Reviews
