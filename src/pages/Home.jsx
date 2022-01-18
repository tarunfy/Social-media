import React from "react";
import Card from "../components/Card";

const Home = () => {
  return (
    <div className="home-container">
      <div className="left">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Home;
