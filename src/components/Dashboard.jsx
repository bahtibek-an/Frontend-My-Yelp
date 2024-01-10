import React, { useEffect } from "react";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";

const Navbar = React.lazy(() => import("./Sidebar/Navbar.jsx"));
const ResultCard = React.lazy(() => import("./FolderAndResult/ResultCard.jsx"));
const AddTableCard = React.lazy(() => import("./FolderAndResult/AddTableCard.jsx"));

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation(); 
  const { folder, childFolders } = useFolder(folderId, state.folder);

  useEffect(() => {
    document.title = "My Yelp || T.Oqilbek";
  });

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="container container0 mb-3 mt-4 p-2 d-flex justify-content-center align-items-center">
          <AddTableCard currentFolder={folder} />
        </div>
        <div className="container container1 mb-4">
          <div className="peer-folder">
            {childFolders.length > 0 && (
              <div className="peer-folder">
                <table className="table table-striped mt-3">
                <thead className="table-active table-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                  {childFolders.map((childFolder) => (
                    <tbody 
                      key={childFolder.id} 
                      className="table-group-divider table-light">
                      <ResultCard folder={childFolder} />
                    </tbody>
                  ))}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;