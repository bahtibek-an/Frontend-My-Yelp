import React, { useState } from "react";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function AddFolderButton({ currentFolder }) {
  const { currentUser } = useAuth();
  const [ name, setName ] = useState("");
  const [ city, setCity ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ pageLoading, setPageLoading ] = useState(false);

  const restaurantSubmit = (e) => {
    e.preventDefault();
    setPageLoading(true);

    database.folders.add({
      name: name,
      city: city,
      description: description,
      userId: currentUser.uid,
      parentId: currentFolder.id,
      createdAt: database.getCurrentTimestamp(),
    });
    setName("");
    setCity("");
    setDescription("");
    setPageLoading(false);
  };

  return (
    <>
      <div class="card p-3 text-dark">
        <form onSubmit={restaurantSubmit}>
          <div class="form-floating mb-3">
            <input value={name} onChange={e => setName(e.target.value)}type="text" class="form-control" id="floatingInput" placeholder="Name" required />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input value={city} onChange={e => setCity(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="City" required />
            <label for="floatingPassword">City</label>
          </div>
          <div class="form-floating mb-3">
            <input value={description} onChange={e => setDescription(e.target.value)} type="text" class="form-control" id="floatingPassword" placeholder="Description" required />
            <label for="floatingPassword">Description</label>
          </div>
          <div className="d-flex justify-content-around align-items-center">
            {pageLoading ? (
              <>
                <button class="btn btn-success w-100 m-1" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span class="visually-hidden" role="status">Loading...</span>
                </button>
              </> ) : (
              <>
                <button type="submit" class="btn btn-success m-1 w-100">Add New Restaurant</button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};