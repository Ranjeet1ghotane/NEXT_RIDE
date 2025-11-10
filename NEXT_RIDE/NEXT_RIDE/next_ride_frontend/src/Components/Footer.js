import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer py-5" style={{ color: "white",backgroundColor:"black" }}>
      <div className="container1" style={{ padding: "2rem" }}>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mr-5">
            <h4 style={{color:"#5edd5b"}}>About Us</h4>
            <p>
              Welcome to NextRide, your trusted destination for hassle-free and
              premium car rental services! We are dedicated to providing you
              with a wide selection of well-maintained vehicles, flexible rental
              options, and affordable rates for all your travel needs. Whether
              it's a weekend getaway, business trip, or daily commute, we have
              the perfect ride for you. Enjoy a seamless booking experience,
              doorstep delivery, and 24/7 customer support to ensure you hit the
              road with confidence and comfort.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4 style={{color:"#5edd5b"}}>Quick Link</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink
                  to="/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h4 style={{color:"#5edd5b"}}>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>City, State, 12345</li>
              <li>Email: info@example.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="d-flex justify-content-center mt-4 mb-2">
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#3b5998", color: "white" }}
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#55acee", color: "white" }}
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#dd4b39", color: "white" }}
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#ac2bac", color: "white" }}
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#0082ca", color: "white" }}
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating mx-2"
            style={{ backgroundColor: "#333333", color: "white" }}
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div
          className="text-center mt-3 "
          style={{ backgroundColor: "#5edd5b", color:"black",padding: "10px" }}
        >
          © 2025 Copyright: NextRide
        </div>
      </div>
    </footer>
  );
}

export default Footer;
