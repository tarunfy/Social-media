import React, { useState, useEffect, useContext } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { AuthContext } from "../contexts/auth";
import { db, storage } from "../services/firebase";
import {
  doc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Profie = () => {
  const { user, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [docId, setDocId] = useState("");
  const [userData, setUserData] = useState(null);

  //get user's current location for google maps:
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
          zoom: 14,
        });
        new google.maps.Marker({
          position: { lat, lng },
          map,
        });
      });
    });
  }, []);

  //get user's creds from firebase:
  useEffect(async () => {
    try {
      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("userId", "==", user.userId));
      const res = await getDocs(q);
      setUserData(res.docs[0].data());
      setDocId(res.docs[0].id);
    } catch (err) {
      console.log(err.message);
    }
  }, [profileImg]);

  //updating user's profile
  const handleSubmit = (e) => {
    e.preventDefault();

    let file = e.target[3].files[0];
    if (!file) return;
    const storageRef = ref(storage, `profile/${user.userId}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => console.log(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const docRef = doc(db, "users", docId);
        const res = await updateDoc(docRef, {
          email,
          contactNumber,
          fullName,
          profilePhoto: url,
        });
        setUser({ ...user, profilePhoto: url });
        setProfileImg("");
        setContactNumber("");
        setEmail("");
        setFullName("");
      }
    );
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
                placeholder={userData && userData.email}
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
                placeholder={userData && userData.fullName}
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
                placeholder={userData && userData.contactNumber}
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
