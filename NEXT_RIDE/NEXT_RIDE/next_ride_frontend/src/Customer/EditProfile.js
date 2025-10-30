import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState(""); // preserve old password

  const editUrl = `http://localhost:8080/customer/getUserById/${id}`;
  const updateUrl = `http://localhost:8080/customer/updateUser/${id}`;

  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const user = sessionStorage.getItem("userName");
    if (!user) {
      navigate("/");
    } else if (role === "CUSTOMER") {
      navigate("/customer");
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { userName, email, contact, pincode, address, password } =
          response.data;
        setUserName(userName || "");
        setEmail(email || "");
        setContact(contact || "");
        setPincode(pincode || "");
        setAddress(address || "");
        setOldPassword(password || ""); // Save old password
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Failed to load profile.");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    const finalPassword = password.trim() === "" ? oldPassword : password;
    const userDetails = {
      userName,
      email,
      contact,
      pincode,
      address,
    };

    if (password.trim() !== "") {
      userDetails.password = password; // new password
    }

    axios
      .put(updateUrl, userDetails, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Update failed:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <>
      <CustomerNavbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}
      >
        <ToastContainer />
        <div
          className="shadow-lg p-4 rounded"
          style={{
            width: "450px",
            backgroundColor: "#ffffff",
            border: "1px solid #dedede",
          }}
        >
          <h3 className="text-center mb-4 text-primary">Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            {/* User Name */}
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                inputMode="numeric"
                pattern="\d{10}"
                maxLength="10"
                required
              />
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                inputMode="numeric"
                pattern="\d{6}"
                maxLength="6"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                required
              />
            </div>

            {/* Password (optional) */}
            <div className="mb-3">
              <label className="form-label">New Password (optional)</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep old password"
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
