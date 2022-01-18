import React, { useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="home-container">
      <div className="left">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="right">
        <form>
          <h2>Add Post</h2>
          <div className="input-container">
            <input type="text" placeholder="Title" />
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              cols="38"
              rows="5"
            ></textarea>
          </div>
          <button type="submit">Add Post</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
