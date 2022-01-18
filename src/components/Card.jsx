import React from "react";
import { BiLike } from "react-icons/bi";

const Card = () => {
  return (
    <div className="card-container">
      <div className="top">
        <h1>Trello App</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
          eligendi deserunt natus nulla quas dolor cum, quia commodi quibusdam
          voluptas culpa vel assumenda, similique eos explicabo sunt.
          Cupiditate, voluptates rerum.
        </p>
      </div>
      <div className="bottom">
        <h5>10 mins ago</h5>
        {""}
        <BiLike id="like-icon" />
      </div>
    </div>
  );
};

export default Card;
