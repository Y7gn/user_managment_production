import { useState } from "react";
// import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
const NavLinks = ({ ToggleSideBar }) => {
  const { user } = useAppContext();
  console.log(user.permissions);
  let mypath = [
    user.permissions?.addEmployee ? "add-employee" : undefined,
    user.permissions?.showAllEmployee ? "all-employee" : null,
  ].filter(Boolean);
  console.log(mypath);
  const links = [
    {
      id: 1,
      text: "لوحة التحكم",

      path: "/",
      icon: <IoBarChartSharp />,
      menuItems: ["لوحة التحكم"],
    },
    {
      id: 2,
      text: "الموظفين",
      path: [
        user.permissions?.addEmployee ? "add-employee" : undefined,
        user.permissions?.showAllEmployee ? "all-employee" : null,
      ].filter(Boolean),
      icon: <MdQueryStats />,
      menuItems: [
        {
          name: "اضافة موظف",
          value: user.permissions?.addEmployee ?? true,
        },
        // "أدوار الموظفين",
        {
          name: "جميع الموظفين",
          value: user.permissions?.showAllEmployee ?? true,
        },
        // "الموظف المثالي",
      ],
      // roles: [user.permissions.addEmployee, user.permissions.showAllEmployee], // <-- only addEmployee role/permission
    },
    {
      id: 3,
      text: "العملاء",
      // path: "add-job",
      path: [
        user.permissions?.addCustomer ? "add-customer" : null,
        "emp-customers",
        user.permissions?.showAllCustomers ? "all-customers" : null,
      ].filter(Boolean),
      icon: <FaWpforms />,
      menuItems: [
        {
          name: "اضافة عميل جديد",
          value: user.permissions?.addCustomer ?? true,
        },
        { name: "عملائي", value: true },
        {
          name: "جميع العملاء",
          value: user.permissions?.showAllCustomers ?? true,
        },
        // "add new customer",
        // "ارسال عميل",
        // "الحسابات المنتظرة",
        // "my customers",
        // "all customers",
      ],
      // roles: [
      //   user.permissions.addCustomer,
      //   true,
      //   user.permissions.showAllCustomers,
      // ],
    },
    {
      id: 4,
      text: "التقارير",
      // path: 'profile',
      path: ["profile", "aw", "all-jobs", "add-job"],
      icon: <ImProfile />,
      menuItems: [
        "add customer",
        "customer Roles",
        "all customers",
        "الموظف المثالي",
      ],
    },
  ];
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
    setActiveStatus((prevState) => ({
      firstnavcontainer: true,
      secondnavcontainer: false,
      thirdnavcontainer: false,
    }));
  };
  const secondFunction = () => {
    setActiveStatus((prevState) => ({
      ...prevState,
      firstnavcontainer: false,
      secondnavcontainer: true,
      thirdnavcontainer: false,
    }));
    // console.log(activeStatus);
  };
  const thirdFunction = () => {
    setActiveStatus((prevState) => ({
      ...prevState,
      firstnavcontainer: false,
      secondnavcontainer: false,
      thirdnavcontainer: true,
    }));
  };

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, menuItems, roles } = link;

        return (
          <>
            {/* first item */}
            {id === 1 && (
              <div className="nav-item extra" onClick={firstFunction}>
                <ul className="dropdown-menu">
                  {menuItems
                    .filter((item) => !item.roles)
                    .map((item, index) => (
                      <NavLink
                        to={path[index]}
                        // onClick={ToggleSideBar}
                        className={({ isActive }) =>
                          isActive
                            ? "dropdownmenu-item red-background"
                            : "dropdownmenu-item"
                        }
                      >
                        <div className="dropdown-itemcontainer">
                          <span className="dropdown-itemtext">{item}</span>
                        </div>
                      </NavLink>
                    ))}
                </ul>
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
                    {menuItems
                      .filter((menuItem) => menuItem.value !== false)
                      .map((menuItem, index) => (
                        <NavLink
                          to={path[index]}
                          // onClick={ToggleSideBar}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdownmenu-item active"
                              : "dropdownmenu-item"
                          }
                        >
                          <div className="dropdown-itemcontainer">
                            <span className="dropdown-itemtext">
                              {menuItem.name}
                            </span>
                          </div>
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
                    {menuItems
                      .filter((menuItem) => menuItem.value !== false)
                      .map((item, index) => (
                        <NavLink
                          to={path[index]}
                          // onClick={ToggleSideBar}
                          className={({ isActive }) =>
                            isActive
                              ? "dropdownmenu-item active"
                              : "dropdownmenu-item"
                          }
                        >
                          <div className="dropdown-itemcontainer">
                            <span className="dropdown-itemtext">
                              {item.name}
                            </span>
                          </div>
                        </NavLink>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </>
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

// {
//   id: 4,
//   text: "reports",
//   // path: 'profile',
//   path: ["profile", "/", "all-jobs", "add-job"],
//   icon: <ImProfile />,
//   menuItems: ["add", " roles", " all", "best "],
// },
