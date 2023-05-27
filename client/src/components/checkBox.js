export const CheckBox = ({ type, name, value, handleChange, labelText }) => {
  return (
    <label className="containerchecks">
      <input type={type} name={name} checked={value} onChange={handleChange} />
      {labelText}
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
