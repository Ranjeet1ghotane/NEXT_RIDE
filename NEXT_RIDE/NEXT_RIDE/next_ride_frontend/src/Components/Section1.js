import React from "react";

function Section1() {
  return (
    <div className="mycontainer my-5" style={{ backgroundColor: "#000000ff",margin:"5%",color:"white" }}>
      <div className="row align-items-center">
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1" style={{color:"#5edd5b"}}>Rent A Car</h2>
          <p className="mb-4 me-5 fs-5">
            NextRide is a globally renowned car rental brand that has redefined
            mobility solutions in India. With a strong legacy dating back to
            1990 in Los Angeles, California, DriveEase has become synonymous
            with reliable, convenient, and affordable travel experiences.
            DriveEase India has carried this legacy forward since its inception
            in 2010, offering world-class car rental services tailored to meet
            the diverse needs of travelers. Our extensive fleet of
            well-maintained vehicles, seamless booking process, and exceptional
            customer service set us apart. With a growing presence across major
            cities, DriveEase India empowers customers to explore their journeys
            with freedom, comfort, and confidence, making every ride memorable
            and stress-free.
          </p>
          <button className="btn btn-dark mb-4" style={{backgroundColor:"#5edd5b"}}>Read More</button>
        </div>

        <div className="col-lg-5 col-md-6 col-12" >
          <div className="row g-2">
            <img
              src="./assests/sideimg.png"
              alt="Gym Transform"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
