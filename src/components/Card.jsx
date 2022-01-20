import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { db } from "../services/firebase";
import { doc, updateDoc } from "firebase/firestore";

const Card = ({ title, description, likes, createdAt, docId }) => {
  const [toggleLiked, setToggledLiked] = useState(false);

  const handleToggledLiked = async () => {
    try {
      setToggledLiked((toggleLiked) => !toggleLiked);
      const docRef = doc(db, "posts", docId);
      const updatedDoc = await updateDoc(docRef, {
        likes: toggleLiked ? likes - 1 : likes + 1,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="card-container">
      <div className="top">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="bottom">
        <h5>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</h5>
        <div id="like-container">
          <p>{likes}</p>
          {toggleLiked ? (
            <>
              <AiFillLike id="like-icon" onClick={handleToggledLiked} />
            </>
          ) : (
            <>
              <AiOutlineLike id="like-icon" onClick={handleToggledLiked} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
