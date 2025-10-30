import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewRentals.css";
import Admin from "./Admin";

function ViewRentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!sessionStorage.getItem("userName")) {
  //     navigate("/");
  //   } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
  //     navigate("/customer");
  //   } else if (sessionStorage.getItem("userRole") !== "ADMIN") {
  //     navigate("/admin");
  //   }
  // }, [navigate]);

  // Fetch rentals from the API on component mount
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get("http://localhost:8080/admin/getAllRentals", config);
        setRentals(response.data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      }
    };

    fetchRentals();
  }, []);

  return (
    <Admin>
      <div className="view-orders-container">
        <h2>View Rentals</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Rental ID</th>
              <th>Vehicle Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {rentals.length > 0 ? (
              rentals.map((rental) => (
                <tr key={rental.rentalId}>
                  <td>{rental.rentalId}</td>
                  <td>{rental.vehicleName || "N/A"}</td>
                  <td>{rental.startDate}</td>
                  <td>{rental.endDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No rentals available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewRentals;
