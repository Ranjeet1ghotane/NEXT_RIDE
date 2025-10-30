import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Rental.css";
import CustomerNavbar from "./CustomerNavbar";

function Rental() {
  const [rental, setRental] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8080/customer/user/${userId}`,
        config
      );
      setRental(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

 return (
  <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
    <CustomerNavbar />
    <div className="orders-container">
      <h2 className="orders-heading">My Rentals</h2>
      {rental.length > 0 ? (
        <div className="rental-grid">
          {rental.map((rental) => (
            <div key={rental.rentalId} className="order-item">
              <div className="order-info">
                <h4>Rental ID: {rental.rentalId}</h4>
                <p>🚗 Vehicle Name: <strong>{rental.vehicleName}</strong></p>
                <p>📅 Rent on: {rental.startDate ? new Date(rental.startDate).toLocaleDateString() : "N/A"}</p>
                <p>⏳ End on: {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-orders-message">You have no rental vehicles.</p>
      )}
    </div>
  </div>
);

}

export default Rental;
