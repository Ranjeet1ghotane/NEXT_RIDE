import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./ViewPayments.css"; // Your custom styles
import { useNavigate } from "react-router-dom";
import Admin from "./Admin"; // Assuming Admin component is used for layout

function ViewPayments() {
  const [payments, setPayments] = useState([]);

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

  // Fetch payments from the API on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        const response = await axios.get("http://localhost:8080/admin/getAllPayments", config); // Use axios.get with config
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
  
    fetchPayments();
  }, []);
  
  return (
    <Admin>
      <div className="view-payments-container">
        <h2>View Payments</h2>
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Payment Date</th>
              <th>User Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.userName || "N/A"}</td> {/* Show 'N/A' if userName is null */}
                  <td>{payment.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No payments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewPayments;
