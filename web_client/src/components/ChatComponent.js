import React, { useState } from "react";

import FormComponent from "./common/form/FormComponent";
import { formConfig } from "../configs";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    console.log(event.target.value);
  };

  const handleLastNameChange = (event) => {
    console.log(event.target.value);
  };

  const handleEmailChange = (event) => {
    console.log(event.target.value);
  };

  const handleGenderChange = (event) => {
    console.log(event.target.value);
  };

  const handleHobbiesChange = (event) => {
    console.log(event.target.value);
  };

  const handleNewsletterChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <h1>Main chat</h1>
      <FormComponent
        formConfig={formConfig}
        changeHandlers={{
          handleFirstNameChange,
          handleLastNameChange,
          handleEmailChange,
          handleGenderChange,
          handleHobbiesChange,
          handleNewsletterChange,
        }}
      />
    </div>
  );
};

export default ChatComponent;
