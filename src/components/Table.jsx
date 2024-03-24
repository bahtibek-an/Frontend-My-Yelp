import React from "react";
import { Stack } from "@mui/material";
import "./Table.css";

const Table = ({ itemList, userId }) => {
  return (
    <Stack className="yelp">
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>#</th>
            <th style={{ width: "200px" }}>Restaurant Name</th>
            <th style={{ width: "300px" }}>Description</th>
            <th style={{ width: "200px" }}>City</th>
          </tr>
        </thead>
        <tbody className="yelp" >
          {itemList
            ? itemList.map((item, index) => {
                if (userId === item.userId) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.city}</td>
                    </tr>
                  );
                }
                return null;
              })
            : null}
        </tbody>
      </table>
    </Stack>
  );
};

export default Table;
