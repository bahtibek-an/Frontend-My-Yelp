import React, { useEffect, useState } from "react";
import Item from "./Item";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { restaurantsDB } from "../firebase/config";
import "../firebase/config"

const Table = () => {
  const [data, setData] = useState([]);
  const auth = getAuth();
  const userId = auth?.currentUser?.uid;

  const restaurantsRef = collection(restaurantsDB, "Restaurants");

  const getData = async () => {
    const data = await getDocs(restaurantsRef);
    const filterData = data.docs.map((item) => ({ ...item.data() }));
    setData(filterData);
  };
  useEffect(() => {
    getData();
  }, [data]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Restaurants</th>
          <th>Description</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody className="item">
        {data.map(
          (item, i) =>
            item.userId === userId && (
              <Item
                key={i}
                name={item.name}
                description={item.description}
                city={item.city}
              />
            )
        )}
      </tbody>
    </table>
  );
};

export default Table;
