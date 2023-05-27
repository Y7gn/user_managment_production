export const FormRow = ({ type, name, value, handleChange, labelText }) => {
  const isTel = type === "tel";
  const pattern = isTel ? "[0-9]{3}-[0-9]{3}-[0-9]{4}" : undefined;
  return (
    <div className="marginRow form-now">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        pattern={pattern}
        className="form-input form-input-extra"
      />
    </div>
  );
};

export default FormRow;
