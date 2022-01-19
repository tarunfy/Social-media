import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPost] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPost(posts);
    });
  }, []);

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  );
};
