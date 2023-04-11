import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  optionsIsActivated,
}) => {
  const [inputValue, setInputValue] = useState(""); // new state variable
  var newList = [...list, "other"];

  const { handleChange2 } = useAppContext();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
    console.log(inputValue);
    console.log(e.target.value);
    handleChange2({ name, value: inputValue });
  };
  return (
    <div className="formRow">
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
        {newList.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>

      {optionsIsActivated && !list.includes(value) && (
        <>
          <input
            type="text"
            value={inputValue}
            name={name}
            onChange={handleInputChange}
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
