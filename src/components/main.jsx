import React, { useEffect, useState } from "react";
import "./styles/main.css";
import "../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Main = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");

  const restaurantCollectionRef = collection(db, "restaurants");

  const auth = getAuth();

  const getItemList = async () => {
    try {
      const data = await getDocs(restaurantCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        itemId: doc.itemId,
      }));

      setRestaurantList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(restaurantCollectionRef, {
        name,
        description,
        city,
        userId: auth?.currentUser?.uid,
      });
      setName("");
      setDescription("");
      setCity("");

      getItemList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemList();
  }, []);

  console.log(restaurantList);

  console.log(auth?.currentUser?.uid);

  const logout = () => {
    signOut(getAuth());
  };

  return (
    <div>
      <header>
        <div></div>
        <h1 className="text-danger">Welcome to Yelp</h1>
        <button className="exit btn btn-danger" onClick={logout}>
          Exit
        </button>
      </header>
      <div className="container">
        <section className="main">
          <form onSubmit={onSubmitItem}>
            <h3 className="text-danger">Add Restaurant</h3>
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="City"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>

          <div className="restaurants">
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantList &&
                    restaurantList.map((item, index) => {
                      console.log(item.userId);
                      if (item.userId === auth?.currentUser?.uid) {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.city}</td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
