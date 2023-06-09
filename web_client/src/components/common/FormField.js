const FormField = ({ field, formState, handleInputChange }) => {
  return (
    <div>
      <label>{field.field_label}</label>
      <input
        type={field.field_type}
        name={field.field_name}
        placeholder={field.field_placeholder}
        value={formState[field.field_name] || ""}
        onChange={handleInputChange}
      />
    </div>
  );
};
