import React from "react";

const Item = ({name, description, city}) => {
  return (
    <tr>
      <td>{name}</td>
      <td> {description}</td>
      <td> {city}</td>
    </tr>
  );
};

export default Item;