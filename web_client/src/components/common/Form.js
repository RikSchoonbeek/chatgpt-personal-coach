import React, { useState } from "react";

const Form = ({ config }) => {
  // Destructuring the form configuration
  const { form_fields, form_field_onchange_handlers } = config;

  // Initializing form state
  const formInitialState = form_fields.reduce(
    (acc, field) => ({ ...acc, [field.field_name]: field.field_initial_value }),
    {}
  );
  const [formState, setFormState] = useState(formInitialState);

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    // Updating form state
    setFormState({
      ...formState,
      [fieldName]: fieldValue,
    });

    // Calling specific field handler if present
    if (form_field_onchange_handlers[fieldName]) {
      form_field_onchange_handlers[fieldName](event);
    }
  };

  return (
    <form>
      {form_fields.map((field, index) => (
        <div key={index}>
          <label>{field.field_label}</label>
          <input
            type={field.field_type}
            name={field.field_name}
            placeholder={field.field_placeholder}
            value={formState[field.field_name] || ""}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </form>
  );
};

export default Form;
