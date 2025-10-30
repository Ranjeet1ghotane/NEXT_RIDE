import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import "./Reviews.css"; // <- Make sure to import this

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5050/customer/getAllFeedback")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div>
      <CustomerNavbar />
      <ToastContainer />
      <div className="reviews-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="reviews-heading">Customer Reviews</h2>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              const userId = sessionStorage.getItem("userId");
              if (!userId) {
                toast.warn("You must be logged in to add a review!", {
                  autoClose: 1000,
                });
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                navigate("/customer/addreview");
              }
            }}
          >
            <BsPlusCircleFill size={20} className="me-2" />
            Add Review
          </button>
        </div>

        {reviews.length > 0 ? (
          <div className="review-grid">
            {reviews.map((review) => (
              <div key={review.feedbackId} className="review-card-container">
                <div className="review-card">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="card-title">{review.userName}</h5>
                    <span className="badge bg-gradient">Verified</span>
                  </div>
                  <p className="card-text">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
