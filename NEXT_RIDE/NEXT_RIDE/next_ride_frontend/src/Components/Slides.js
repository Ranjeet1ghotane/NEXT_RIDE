import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <ToastContainer />
      
      <img
        src="./assests/slide2.png"
        alt="Banner"
        style={{
          zIndex: 1,
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
          objectFit: "cover"
        }}
      />

      {/* Overlay Text */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '10%',
          transform: 'translateY(-50%)',
          color: 'white',
          textAlign: 'left',
          zIndex: 2
        }}
      >
        <h3 style={{ color: '#4ef10eff', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Find Your Perfect Car
        </h3>
        <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0' }}>
          Looking for a vehicle?
        </h1>
        <h1 style={{ fontSize: '3.5rem', margin: '0.5rem 0' }}>
          You're in the perfect spot.
        </h1>
        {/* <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>
          High quality at a low cost,
        </h1>
        <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>
          Premium services
        </h1> */}
      </div>
    </div>
  );
}

export default Slides;
