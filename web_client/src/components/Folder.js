import React, { useState } from "react";

import axios from "axios";

import { apiUrls } from "../urls";

const Folder = ({
  folder,
  onAddSnippet,
  onDeleteFolder,
  onDeleteSnippet,
  onRenameFolder,
  onSnippetRename,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        marginBottom: "5px",
        // backgroundColor: "rgba(255, 255, 255, 0.4)",
        border: "2px solid white",
        borderRadius: "3px",
      }}
    >
      <div
        onClick={() => setShowContent(!showContent)}
        style={{
          display: "flex",
          flexDirection: "row",

          backgroundColor: "white",
          padding: "3px 6px",
          borderRadius: "3px",
        }}
      >
        <span
          style={{
            marginRight: "auto",
          }}
        >
          {folder.name}
        </span>
        <button onClick={onRenameFolder}>R</button>
        <button onClick={onDeleteFolder}>D</button>
      </div>
      {showContent && (
        // Button to add snippet, button to delete snippet and button to rename snippet
        <div>
          <button onClick={() => setShowAddModal(true)}>A</button>
          <ul>
            {folder.snippets.map((snippet) => (
              <li>{snippet.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Folder;
