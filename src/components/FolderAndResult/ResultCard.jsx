import React from "react";

const Folder = ({ folder }) => (
  <tr>
    <td>{folder.name}</td>
    <td>{folder.city}</td>
    <td>{folder.description}</td>
  </tr>
);

export default Folder;