import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  // useEffect(() => {
  //   if (!sessionStorage.getItem("userName")) {
  //     navigate("/");
  //   } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
  //     navigate("/customer");
  //   } else if (sessionStorage.getItem("userRole") === "ADMIN") {
  //     navigate("/admin");
  //   }
  // }, [navigate]);

  const [vehicleName, setVehicleName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const editUrl = `http://localhost:8080/admin/getVehicleById/${id}`;
  const updateUrl = `http://localhost:8080/admin/updateVehicle/${id}`;

  // Configuration for headers with JWT token
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  useEffect(() => {
    axios
      .get(editUrl, config)
      .then((response) => {
        const { vehicleName, price, quantity, description } = response.data;
        setVehicleName(vehicleName); 
        setPrice(price);
        setQuantity(quantity);
        setDescription(description);
      })
      .catch((error) => {
        console.error("Error occurred getting product details:", error);
        toast.error("Failed to fetch product details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productUpdateDTO = { price, quantity, description }; // Only send price and quantity for update

    axios
      .put(updateUrl, productUpdateDTO, config)
      .then(() => {
        toast.success("Product updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewproducts"); // Redirect to View Products page
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        toast.error("Failed to update product.");
      });
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "1px solid black",
            color: "black",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #a9ab99",
            backgroundColor: "#f4f4f9",
          }}
        >
          <h2 className="text-center mb-4">Edit Vehicle</h2>
          <form onSubmit={handleSubmit}>
            {/* Product Name - Non-editable */}
            <div className="mb-3">
              <label>Vehicle Name:</label>
              <input
                type="text"
                className="form-control"
                value={vehicleName}
                readOnly
                style={{ height: "30px", backgroundColor: "#e9ecef" }}
              />
            </div>

            {/* Price */}
            <div className="mb-3">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label>Description:</label>
              <input
                type="textarea"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#a9ab99" }}
              >
                Edit Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditProduct;
