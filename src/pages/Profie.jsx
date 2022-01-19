import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Profie = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      let lat = res.coords.latitude;
      let lng = res.coords.longitude;
      const loader = new Loader({
        apiKey: "AIzaSyDsZCxaEUDz9QyfTZPPsXXfLdl25P9wzmk",
        version: "weekly",
      });
      loader.load().then((google) => {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: { lat, lng },
          zoom: 10,
        });
        new google.maps.Marker({
          position: { lat, lng },
          map,
        });
      });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, fullName, contactNumber, profileImg);
  };
  return (
    <div className="profile-container">
      <h1>Edit your profile</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="field-container">
              <label htmlFor="email">Email:</label>
              <input
                autoComplete="off"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                autoComplete="off"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="name"
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="contact">Contact Number:</label>
              <input
                type="tel"
                autoComplete="off"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                id="contact"
                required
              />
            </div>
            <div className="field-container">
              <label htmlFor="profile-img">Profile Image:</label>
              <input
                autoComplete="off"
                value={profileImg}
                onChange={(e) => setProfileImg(e.target.value)}
                type="file"
                id="profile-img"
                required
              />
            </div>
          </div>
          <button className="btn">Update</button>
        </form>
        <div id="map"></div>
      </div>
    </div>
  );
};

export default Profie;
