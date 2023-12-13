import React, { useState } from "react";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function AddFolderButton({ currentFolder }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  var [number] = useState("");
  const { currentUser } = useAuth();

  const restaurantSubmit = (e) => {
    e.preventDefault();

    if(name === "" || description === "" || city === "") {
      alert("Please provide value in each input field");
      return;
    }

    database.folders.add({
      name: name,
      description: description,
      city: city,
      number: number++,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
    })
    setName("");
    setDescription("");
    setCity("");
  }

  return (
    <>
      <div class="card p-3 text-dark">
        <form onSubmit={restaurantSubmit}>
          <div class="form-floating mb-3">
            <input value={name} onChange={e => setName(e.target.value)}type="text" class="form-control" id="floatingInput" placeholder="Name" />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input value={description} onChange={e => setDescription(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="Description" />
            <label for="floatingPassword">Description</label>
          </div>
          <div class="form-floating mb-3">
            <input value={city} onChange={e => setCity(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="City" />
            <label for="floatingPassword">City</label>
          </div>
          <div className="d-flex justify-content-around align-items-center">
            <button type="submit" class="btn btn-success m-1 w-100">Add New Restaurant</button>
          </div>
        </form>
      </div>
    </>
  );
};