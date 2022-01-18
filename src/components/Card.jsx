import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const Card = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

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
        {isLiked ? (
          <>
            <AiFillLike id="like-icon" onClick={handleLike} />
          </>
        ) : (
          <>
            <AiOutlineLike id="like-icon" onClick={handleLike} />
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
