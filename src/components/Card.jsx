import React, { useState, useContext } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { AuthContext } from "../contexts/auth";
import { db } from "../services/firebase";
import { doc, updateDoc, FieldValue } from "firebase/firestore";

const Card = ({ title, description, likes, createdAt, docId }) => {
  const { user } = useContext(AuthContext);
  const [totalLikes, setTotalLikes] = useState(likes.length);
  const [toggleLiked, setToggledLiked] = useState(false);

  const handleToggledLiked = async () => {
    setToggledLiked((toggleLiked) => !toggleLiked);

    try {
      const fieldValue = new FieldValue();
      const docRef = doc(db, "posts", docId);
      await updateDoc(docRef, {
        likes: toggleLiked
          ? fieldValue.arrayRemove(user.uid)
          : fieldValue.arrayUnion(user.uid),
      });
      setTotalLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
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
        {/*moment(createdAt).startOf("ss").fromNow()*/}
        <h5>{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</h5>
        <div id="like-container">
          <p>{totalLikes}</p>
          {totalLikes > 0 && toggleLiked ? (
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
