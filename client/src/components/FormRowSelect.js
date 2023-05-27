const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  optionsIsActivated,
  optionInputName,
  optionInputValue,
}) => {
  // const handleInputChange = () => {
  //   console.log(optionInputName);
  //   console.log(optionInputValue);
  //   handleChange({ name: optionInputName, value: optionInputValue });
  // };
  return (
    <div className="marginRow elementRow formRow">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select choosebtn"
        style={{ color: "black" }}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>

      {optionsIsActivated && (
        <>
          <input
            type="text"
            value={optionInputValue}
            name={optionInputName}
            onChange={handleChange}
            className="form-input other-input"
          />
        </>
      )}
    </div>
  );
};

export default FormRowSelect;

// const [isLocked, setIsLocked] = useState(true);
//
// {/* <input
//             type="radio"
//             className="other-multiple"
//             onClick={() => {
//               // setIsLocked(!isLocked);
//               // setInputValue("");
//             }}
//             checked={isLocked}
//             onChange={() => {}}
//           /> */}

//                       // disabled={isLocked}
