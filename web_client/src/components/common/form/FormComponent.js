import React, { useState } from "react";

// Helper component for text and email inputs
const TextInput = ({ field, value, errors, setFieldValue }) => (
  <div>
    <label>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      required={field.required}
      onChange={(event) => {
        field.onChange(event);
        setFieldValue(field.name, event.target.value);
      }}
    />
    {errors && errors.map((error, i) => <p key={i}>{error}</p>)}
  </div>
);

// Helper component for group inputs
const GroupInput = ({ field, value, errors, setFieldValue }) => (
  <div>
    <label>{field.label}</label>
    {field.options.map((option, i) => (
      <label key={i}>
        {option.label}
        <input
          type="radio"
          name={field.name}
          value={option.value}
          checked={value === option.value}
          required={field.required}
          onChange={(event) => {
            field.onChange(event);
            setFieldValue(field.name, event.target.value);
          }}
        />
      </label>
    ))}
    {errors && errors.map((error, i) => <p key={i}>{error}</p>)}
  </div>
);

// Helper component for checkbox inputs
const CheckboxInput = ({ field, value, errors, setFieldValue }) => (
  <div>
    <label>{field.label}</label>
    <input
      type="checkbox"
      name={field.name}
      checked={value}
      onChange={(event) => {
        field.onChange(event);
        setFieldValue(field.name, event.target.checked);
      }}
    />
    {errors && errors.map((error, i) => <p key={i}>{error}</p>)}
  </div>
);

// Helper component for button inputs
const Button = ({ button }) => (
  <button type={button.type} onClick={button.onClick}>
    {button.label}
  </button>
);

// Main component
const FormComponent = ({ formConfig }) => {
  console.log("formConfig", formConfig);
  const { formFields, errors: initialErrors, buttons } = formConfig;
  const [fieldValues, setFieldValues] = useState(
    formFields.reduce(
      (values, field) => ({
        ...values,
        [field.name]: field.initialValue || "",
      }),
      {}
    )
  );
  const [errors, setErrors] = useState(initialErrors || {});

  const setFieldValue = (name, value) => {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form name={formConfig.formName}>
      {formFields.map((field) => {
        const fieldValue = fieldValues[field.name];
        const fieldErrors = errors[field.name];
        if (field.type === "text" || field.type === "email") {
          return (
            <TextInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              setFieldValue={setFieldValue}
            />
          );
        } else if (field.type === "group") {
          return (
            <GroupInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              setFieldValue={setFieldValue}
            />
          );
        } else if (field.type === "checkbox") {
          return (
            <CheckboxInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              setFieldValue={setFieldValue}
            />
          );
        }
        return null;
      })}
      {buttons &&
        buttons.map((button, i) => <Button key={i} button={button} />)}
    </form>
  );
};

export default FormComponent;
