import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import axios from "axios";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import CustomerNavbar from "./Components/CustomerNavbar";
import Payment from "./Components/Payment";
import Orders from "./Components/Rental";

// Admin Components
import Admin from "./Admin/Admin";
import AddCategory from "./Admin/AddCategory";
import AddProduct from "./Admin/AddVehicle";
import ViewProducts from "./Admin/ViewProducts";
import ViewOrders from "./Admin/ViewRentals";
import ViewPayments from "./Admin/ViewPayments";
import EditProduct from "./Admin/EditProduct";
import EditProfile from "./Customer/EditProfile";
import Reviews from "./Customer/Reviews";
import AddReview from "./Customer/AddReview";
import Rental from "./Components/Rental";

function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/products/:id"element={<ProductList/>}/>

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/addproducts" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts />} />
            <Route path="/admin/vieworders" element={<ViewOrders />} />
            <Route path="/admin/viewPayments" element={<ViewPayments/>}/>
            <Route path="/admin/editproduct/:id" element={<EditProduct/>}></Route>


            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/viewrental/:id" element={<Rental/>}/>
            <Route path="/customer/addreview" element={<AddReview/>}/>
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders/:userId" element={<Orders />} />
            <Route path="/editprofile/:id" element={<EditProfile/>}/>
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
