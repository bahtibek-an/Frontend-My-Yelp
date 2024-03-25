import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { restaurantsDB } from "../firebase/config";
// import "../App.css";

export const Form = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  const restaurantsRef = collection(restaurantsDB, "Restaurants");
  const auth = getAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = auth?.currentUser?.uid;
    try {
      await addDoc(restaurantsRef, {
        name,
        description,
        city,
        userId,
      })
        .then(() => {})
        .catch(() => {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="form__title">Add Restaurant</h2>
      <div className="form">
        <div>
          {/* <p>Name</p> */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          {/* <p>Description</p> */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          {/* <p>City</p> */}
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
      <button className="button">Add New</button>
      </div>
    </form>
  );
};

export default Form;
