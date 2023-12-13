import React from "react";

const Folder = ({ folder }) => (
  <tr>
    <th scope="row">{folder?.number}</th>
    <td>{folder.name}</td>
    <td>{folder.description}</td>
    <td>{folder.city}</td>
  </tr>
);

export default Folder;
