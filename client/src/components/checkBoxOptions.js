export const checkBoxOptions = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}) => {
  return (
    <label className="containerchecks">
      <input type={type} name={name} checked={value} onChange={handleChange} />
      <span className="checkmark"></span>
      {labelText}
    </label>
  );
};

export default checkBoxOptions;
