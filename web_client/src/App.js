import React from "react";

import axios from "axios";

import "./App.css";
import SnippetOverview from "./components/SnippetOverview";
import FormComponent from "./components/common/form/FormComponent";
import { formConfig } from "./configs";
import ChatComponent from "./components/ChatComponent";

function App() {
  const handleGetFolders = () => {
    axios
      .get("http://localhost:8000/folder/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      id="App"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SnippetOverview />
      <ChatComponent />
    </div>
  );
}

export default App;
