import { useState } from "react";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
// import { ReactComponent as DropdownIcon } from '../assets/icons/dropdown.svg';
import { BsChevronDown } from "react-icons/bs";

const NavLinks = ({ ToggleSideBar }) => {
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(true);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false);

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
  };
  const toggleDropdown3 = () => {
    setIsDropdownOpen3(!isDropdownOpen3);
  };

  const [activeStatus, setActiveStatus] = useState({
    firstnavcontainer: false,
    secondnavcontainer: false,
    thirdnavcontainer: false,
  });

  const firstFunction = () => {
    // if(firstnavcontainer== true){

    // }
    console.log("first");
    setActiveStatus((prevState) => ({
      firstnavcontainer: !prevState.firstnavcontainer,
      secondnavcontainer: false,
      thirdnavcontainer: false,
    }));
    console.log(activeStatus);
  };
  const secondFunction = () => {
    console.log("second");
    setActiveStatus((prevState) => ({
      ...prevState,
      firstnavcontainer: false,
      secondnavcontainer: !prevState.secondnavcontainer,
      thirdnavcontainer: false,
    }));
    console.log(activeStatus);
  };
  const thirdFunction = () => {
    // if(){

    // }
    console.log("third");
    setActiveStatus((prevState) => ({
      ...prevState,
      firstnavcontainer: false,
      secondnavcontainer: false,
      thirdnavcontainer: !prevState.thirdnavcontainer,
    }));
    console.log(activeStatus);
  };
  //   console.log(activeStatus.firstnavcontainer);
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, menuItems } = link;
        return (
          //   <NavLink
          //     to={path}
          //     key={id}
          //     onClick={ToggleSideBar}
          //     className={({ isActive }) =>
          //       isActive ? "nav-link active" : "nav-link"
          //     }
          //   >
          <>
            {id === 1 && (
              <div className="nav-item extra" onClick={firstFunction}>
                <button
                  className={`dropdown-toggle ${
                    activeStatus.firstnavcontainer ? "red-background" : ""
                  }`}
                >
                  <div className="dropdownbtn">
                    <span className="icon">{icon}</span>
                    <span>{text}</span>
                  </div>
                  <BsChevronDown
                    className="dropdown-icon"
                    style={{ display: "none" }}
                  />
                </button>
              </div>
            )}

            {id === 2 && (
              <div className="nav-item extra" onClick={secondFunction}>
                <button
                  className={`dropdown-toggle ${
                    activeStatus.secondnavcontainer ? "red-background" : ""
                  }`}
                >
                  <div className="dropdownbtn">
                    <span className="icon">{icon}</span>
                    <span>{text}</span>
                  </div>
                  <BsChevronDown
                    className="dropdown-icon"
                    onClick={toggleDropdown2}
                  />
                </button>
                {isDropdownOpen2 && (
                  <ul className="dropdown-menu">
                    {menuItems.map((item, index) => (
                      <NavLink
                        to={path[index]}
                        // onClick={ToggleSideBar}
                        className={({ isActive }) =>
                          isActive
                            ? "dropdownmenu-item active"
                            : "dropdownmenu-item"
                        }
                      >
                        {/* <div className={`dropdownmenu-item`} key={index}> */}
                        <div className="dropdown-itemcontainer">
                          <span className="dropdown-itemtext">{item}</span>
                        </div>
                        {/* </div> */}
                      </NavLink>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {id === 3 && (
              <div className="nav-item extra" onClick={thirdFunction}>
                <button
                  className={`dropdown-toggle ${
                    activeStatus.thirdnavcontainer ? "red-background" : ""
                  }`}
                >
                  <div className="dropdownbtn">
                    <span className="icon">{icon}</span>
                    <span>{text}</span>
                  </div>
                  <BsChevronDown
                    className="dropdown-icon"
                    onClick={toggleDropdown3}
                  />
                </button>
                {isDropdownOpen3 && (
                  <ul className="dropdown-menu">
                    {menuItems.map((item, index) => (
                      <NavLink
                        to={path[index]}
                        // onClick={ToggleSideBar}
                        className={({ isActive }) =>
                          isActive
                            ? "dropdownmenu-item active"
                            : "dropdownmenu-item"
                        }
                      >
                        {/* <div className={`dropdownmenu-item`} key={index}> */}
                        <div className="dropdown-itemcontainer">
                          <span className="dropdown-itemtext">{item}</span>
                        </div>
                        {/* </div> */}
                      </NavLink>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
          //   </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
// {
/* {id === 4 && (
  <div className="nav-item extra">
    <button className="dropdown-toggle">
      <div className="dropdownbtn">
        <span className="icon">{icon}</span>
        <span>التقارير</span>
      </div>
      <BsChevronDown
        className="dropdown-icon"
        onClick={toggleDropdown3}
      />
    </button>
    {isDropdownOpen3 && (
      <ul className="dropdown-menu">
        {menuItems.map((item, index) => (
          <div className={`dropdownmenu-item`} key={index}>
            <div className="dropdown-itemcontainer">
              <NavLink
                to={path[index]}
                onClick={ToggleSideBar}
                className={({ isActive }) =>
                  isActive ? " active" : ""
                }
              >
                <span className="dropdown-itemtext">{item}</span>
              </NavLink>
            </div>
          </div>
        ))}
      </ul>
    )}
  </div>
)} */
// }
