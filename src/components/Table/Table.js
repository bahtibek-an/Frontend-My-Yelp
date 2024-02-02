// Table.js

import React from "react";
import { Stack, Typography } from "@mui/material";
import "./Table.css";

const Table = ({ itemList, userId }) => {
  return (
    <Stack className="table-container">
      {itemList && itemList.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>№</th>
              <th>Restaurant Name</th>
              <th>Description</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {itemList.map((item, index) =>
              userId === item.userId ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.city}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      ) : (
        <Typography variant="body2">No restaurants found.</Typography>
      )}
    </Stack>
  );
};

export default Table;
