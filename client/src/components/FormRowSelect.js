import { useAppContext } from "../context/appContext";
import { useState } from "react";
const FormRowSelect = ({
  labelText,
  name,
  value,
  // handleChange,
  list,
  optionsIsActivated,
  optionInputName,
  optionInputValue,
  displayAlert,
}) => {
  const [showInputOption, setShowInputOption] = useState(
    value !== list[list.length - 1] ? false : true
  );

  const { handleChange } = useAppContext();
  const handleSelectionChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);

    handleChange({ name, value });
    // console.log(value);
    // console.log(list[list.length - 1]);
    value === list[list.length - 1]
      ? setShowInputOption(true)
      : setShowInputOption(false);
    console.log(showInputOption);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };
  return (
    <div className="marginRow elementRow formRow">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <select
        name={name}
        value={value}
        onChange={handleSelectionChange}
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

      {optionsIsActivated & (showInputOption === true) ? (
        <>
          <input
            type="text"
            value={optionInputValue}
            name={optionInputName}
            onChange={handleInputChange}
            className="form-input other-input"
          />
        </>
      ) : null}
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
