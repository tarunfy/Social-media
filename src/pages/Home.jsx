import React, { useState, useContext } from "react";
import { PostContext } from "../contexts/post";
import Card from "../components/Card";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

const Home = () => {
  const { posts } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(db, "posts"), {
        title,
        description,
        createdAt: new Date().toString(),
        likes: 0,
      });
      setTitle("");
      setDescription("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="home-container">
      <div className="left">
        {posts &&
          posts.map((post, index) => (
            <Card
              title={post.title}
              description={post.description}
              createdAt={post.createdAt}
              likes={post.likes}
              key={index}
              docId={post.id}
            />
          ))}
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h2>Add Post</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="Title"
              required
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
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
