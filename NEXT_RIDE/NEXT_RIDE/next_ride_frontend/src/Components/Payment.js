import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css"; // for custom styles

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  const { vehicleId, startDate, endDate, totalPrice } = location.state || {};

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);
  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    return month > 0 && month <= 12 && year >= new Date().getFullYear();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }

    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const userId = sessionStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const formattedStartDate = new Date(startDate)
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

      const rentResponse = await axios.post(
        `http://localhost:8080/customer/rent`,
        null,
        {
          params: {
            userId,
            vehicleId,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
          ...config,
        }
      );

      const rentalId = rentResponse.data;
      if (!rentalId) throw new Error("Rental ID not received");

      await axios.post(`http://localhost:8080/customer/processPayment`, null, {
        params: { rentalId, amount: totalPrice },
        ...config,
      });

      toast.success("Payment successful!", { autoClose: 1500 });
      setTimeout(() => navigate(`/viewrental/${userId}`), 1500);
    } catch (error) {
      console.error("Error:", error);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center vh-100 " style={{backgroundColor:"black"}}
    >
      <MDBCard
        style={{ maxWidth: "480px", width: "100%", borderRadius: "15px" }}
      >
        <MDBCardBody className="p-4">
          {/* Credit Card Preview */}
          <div className="credit-card mb-4">
            <div className="chip" />
            <div className="card-number">
              {cardNumber || "#### #### #### ####"}
            </div>
            <div className="card-name-exp">
              <div className="card-name">{cardHolderName || "FULL NAME"}</div>
              <div className="card-exp">{expiration || "MM/YYYY"}</div>
            </div>
          </div>

          <h4 className="text-center mb-3">Secure Payment</h4>

          <form onSubmit={handleSubmit}>
            <MDBInput
              label="Card Number"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength="16"
              required
              className="mb-3"
            />

            <MDBInput
              label="Cardholder Name"
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              required
              className="mb-3"
            />

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  label="Expiration (MM/YYYY)"
                  type="text"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  required
                  className="mb-3"
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  label="CVV"
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength="3"
                  required
                  className="mb-3"
                />
              </MDBCol>
            </MDBRow>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="text-center mb-3">
              <strong>Total: ₹{totalPrice?.toFixed(2)}</strong>
            </div>

            <div className="d-grid">
              <MDBBtn
                type="submit"
                color="primary"
                disabled={isSubmitting}
                className="d-flex align-items-center justify-content-center gap-2"
                style={{ minHeight: "22px", minWidth: "50px" }}
              >
                {isSubmitting && <MDBIcon fas icon="spinner" spin />}
                Pay Now
              </MDBBtn>
            </div>
          </form>

          {/* Payment method logos */}
          <div className="text-center mt-4">
            <img
              src={`../assests/payment.jpeg`}
              alt="Supported Cards"
              className="img-fluid"
              style={{ maxHeight: "45px", objectFit: "contain" }}
            />
            <div className="text-muted small mt-2">
              Secured by industry-standard encryption 🔒
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
      <ToastContainer />
    </MDBContainer>
  );
}
