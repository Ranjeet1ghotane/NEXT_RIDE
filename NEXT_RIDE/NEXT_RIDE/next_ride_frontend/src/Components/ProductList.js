import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";
import CustomerNavbar from "./CustomerNavbar";

function ProductList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8080/admin/getVehicleByCategory/${id}`,
          config
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  const handleDateChange = (vehicleId, field, value) => {
    setSelectedDates((prev) => ({
      ...prev,
      [vehicleId]: {
        ...prev[vehicleId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (product) => {
    const vehicleDates = selectedDates[product.vehicleId];
    if (!vehicleDates || !vehicleDates.startDate || !vehicleDates.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const today = new Date().setHours(0, 0, 0, 0);
    const start = new Date(vehicleDates.startDate).setHours(0, 0, 0, 0);
    const end = new Date(vehicleDates.endDate).setHours(0, 0, 0, 0);

    if (start < today) {
      toast.error("Start date must be today or later.");
      return;
    }

    if (end <= start) {
      toast.error("End date must be after start date.");
      return;
    }

    const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = differenceInDays * product.price;
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login to add items to the cart.", {
        autoClose: 2000,
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const rentalData = {
      vehicleId: product.vehicleId,
      vehicleName: product.vehicleName,
      pricePerDay: product.price,
      startDate: vehicleDates.startDate,
      endDate: vehicleDates.endDate,
      totalPrice,
    };

    navigate("/payment", { state: rentalData });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <CustomerNavbar />
      <ToastContainer />
      <div className="product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.vehicleId}>
              {product.productImage && (
                <img
                  src={`data:image/png;base64,${product.productImage}`}
                  alt={product.vehicleName}
                  className="product-image"
                />
              )}
              <h3 className="product-name">{product.vehicleName}</h3>
              <p className="product-price">Rs. {product.price} per day</p>
              <p className="product-description">{product.description}</p>

              {/* Date Selection */}
              <div className="date-selection">
                <label>
                  Start Date:
                  <input
                    type="date"
                    value={
                      selectedDates[product.vehicleId]?.startDate || ""
                    }
                    onChange={(e) =>
                      handleDateChange(
                        product.vehicleId,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    value={selectedDates[product.vehicleId]?.endDate || ""}
                    onChange={(e) =>
                      handleDateChange(
                        product.vehicleId,
                        "endDate",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => handleSubmit(product)}
                disabled={product.quantity === 0}
                style={{
                  backgroundColor:
                    product.quantity === 0 ? "red" : "#007bff",
                  color: "white",
                  cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {product.quantity === 0 ? "Not Available" : "Rent"}
              </button>
            </div>
          ))
        ) : (
          <p>No vehicles found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
