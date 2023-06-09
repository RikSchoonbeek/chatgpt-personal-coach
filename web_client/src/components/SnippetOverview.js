import React, { useEffect, useState } from "react";

import axios from "axios";

import { apiUrls } from "../urls";
import Folder from "./Folder";

// TODO initially sort the folders by name, don't make them draggable yet.
//   Keep it simple for now.

const SnippetOverview = () => {
  const [folders, setFolders] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folderToDeleteID, setFolderToDelete] = useState(null);
  const [folderToRenameID, setFolderToRename] = useState(null);

  const folderLoading = folders === null;

  console.log("folders", folders);

  useEffect(() => {
    axios
      .get(apiUrls.folder())
      .then((res) => {
        setFolders(res.data);
      })
      .catch((err) => {
        alert("Error fetching folders");
      });
  }, []);

  const addFolder = () => {
    axios
      .post(apiUrls.folder(), { name: newFolderName })
      .then((res) => {
        const newFolder = res.data;
        setFolders([...folders, newFolder]);
        setNewFolderName("");
      })
      .catch((err) => {
        alert("Error creating folder");
        window.debug(err.response.data);
      })
      .finally(() => setShowAddModal(false));
  };

  const deleteFolder = () => {
    axios
      .delete(apiUrls.folder(folderToDeleteID))
      .then(() => {
        const filteredFolders = folders.filter(
          (folder) => folder.id !== folderToDeleteID
        );
        setFolders(filteredFolders);
      })
      .catch((err) => {
        alert("Error deleting folder");
        window.debug(err.response.data);
      })
      .finally(() => {
        setFolderToDelete(null);
        setShowDeleteModal(false);
      });
  };

  const renameFolder = () => {
    axios
      .patch(apiUrls.folder(folderToRenameID), { name: newFolderName })
      .then((res) => {
        const updatedFolders = folders.map((folder) => {
          if (folder.id === folderToRenameID) {
            return { ...folder, name: res.data.name };
          }
          return folder;
        });
        setFolders(updatedFolders);
        setNewFolderName("");
      })
      .catch((err) => {
        alert("Error renaming folder");
        window.debug(err.response.data);
      })
      .finally(() => {
        setFolderToRename(null);
        setShowRenameModal(false);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "skyblue",
        flex: "0 0 300px",
        padding: "5px",
      }}
    >
      {folderLoading ? (
        <p>Loading folders...</p>
      ) : (
        <>
          <ul
            style={{
              listStyle: "none",
              margin: "0",
              padding: "0",

              display: "flex",
              flexDirection: "column",
            }}
          >
            {folders.map((folder) => (
              <li key={folder.id}>
                <Folder
                  folder={folder}
                  onRenameFolder={() => {
                    setFolderToRename(folder.id);
                    setShowRenameModal(true);
                  }}
                  onDeleteFolder={() => {
                    setFolderToDelete(folder.id);
                    setShowDeleteModal(true);
                  }}
                />
              </li>
            ))}
          </ul>

          <button onClick={() => setShowAddModal(true)}>Add Folder</button>
        </>
      )}

      {showAddModal && (
        <div>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={addFolder}>Add</button>
          <button onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
      )}

      {showDeleteModal && (
        <div>
          <p>Are you sure you want to delete this folder?</p>
          <button onClick={deleteFolder}>Delete</button>
          <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        </div>
      )}

      {showRenameModal && (
        <div>
          <label>New folder name:</label>
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button onClick={renameFolder}>Rename</button>
          <button onClick={() => setShowRenameModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SnippetOverview;
