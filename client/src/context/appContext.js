import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  SET_EDIT_CUSTOMER,
  DELETE_CUSTOMER_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  EDIT_CUSTOMER_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_EMPLOYEE_SUCCESS,
  GET_CUSTOMER_SUCCESS,
  GET_MY_CUSTOMER_SUCCESS,
} from "./actions";
import axios from "axios";

// const token = localStorage.getItem('token')
// const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  // user:user? JSON.parse(user) : null,
  // token:token,
  userLocation: "",
  // userLocation: userLocation || '',
  showSideBar: false,
  isEditing: false,
  isEditingCustomer: false,
  editEmployeeId: "",
  editCustomerId: "",

  customername: "",
  phonenumber: "",

  customerstatusOptions: [
    "عميل تم الانجاز",
    "الحسبة قيد الانتظار",
    "عميل متردد",
    "عميل لم يوافق",
  ],
  companypercentageOptions: ["قيد الانتظار", "other"],
  excesscashcustomerOptions: ["قيد الانتظار", "other"],
  supportedornotOptions: ["مدعوم", "غير مدعوم", "other"],
  salarybankOptions: ["الاهلي", "الفرنسي", "الراجحي", "other"],
  financebankOptions: ["الاهلي", "الفرنسي", "الراجحي", "other"],
  obligationsOptions: [
    "امكان",
    "بنك التسليف",
    "بنك التنمية",
    "سيارة",
    "شركة اليسر",
    "نايفات",
  ],
  buildingPlaceOptions: ["قيد الانتظار", "نجران", "القويقعه", "تربه", "other"],

  customerstatus: "الحسبة قيد الانتظار",

  companypercentage: "",
  companypercentageOptionsInput: "",

  excesscashcustomer: "قيد الانتظار",
  excesscashcustomerOptionsInput: "",

  supportedornot: "مدعوم",
  supportedornotOptionsInput: "",

  salarybank: "الاهلي",
  salarybankOptionsInput: "",

  financebank: "الاهلي",
  financebankOptionsInput: "",

  obligations: {
    personalloan: false,
    creditbank: false,
    developmentbank: false,
    car: false,
    yusrcompany: false,
    nayifat: false,
    other: "",
  },
  buildingPlace: "",
  buildingPlaceOptionsInput: "",

  employees: [],
  customers: [],
  totalJobs: 0,
  mycustomers: [],
  // totalCustomers: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],

  //search
  searchname: "",
  searchphoneNumber: "",
  searchCustomerStatus: "الجميع",
  sort: "latest",
  // sortOptions: ["latest", "oldest", "a-z", "z-a"],
  sortOptionsAr: ["الاحدث", "الاقدم", "أ-ي", "ي-أ"],

  //permissions
  permissions: "",
  newcustomername: "",
  newcustomerusername: "",
  newcustomerpassword: "",
  addEmployeeCheckBox: false,
  allEmployeeCheckBox: false,
  editDeleteEmployeeCheckBox: false,
  addCustomerCheckBox: false,
  allCustomersCheckBox: false,
  editDeleteCustomerCheckBox: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios for global to send with every request
  // axios.defaults.headers['Authorization'] = `Bearer ${state.token}`

  // just fetch for address starting at /api/v1
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers:{
    //     Authorization: `Bearer ${state.token}`
    // }
  });

  // ################## token ###################
  // response interceptor
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers['Authorization'] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      //   console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
        // console.log();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  // const addUserToLocalStorage = ({ user, token, location }) => {
  //     localStorage.setItem('user',JSON.stringify(user))
  //     localStorage.setItem('token',token)
  //     localStorage.setItem('location',location)
  // }

  // const removeUserFromLocalStorage = () => {
  //     localStorage.removeItem('user')
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('location')
  // }

  const registerUser = async (currentUser) => {
    // console.log(currentUser);
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      // console.log(response);
      //token here
      const { user, location } = response.data;
      dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, location } });
      // addUserToLocalStorage({user,token,location})
    } catch (error) {
      //local storage later
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      console.log(currentUser);
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      // console.log(response);

      //add token line 163 and 164
      const { user, location } = data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, location } });
      // addUserToLocalStorage({user,token,location})
    } catch (error) {
      //local storage later
      // console.log(error.response);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const ToggleSideBar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage()
  };

  const updateUser = async (currentUser) => {
    //we still have add job update ..etc so let's use global setup
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      // console.log("started here");
      const { data } = await authFetch.patch(
        "/auth/updateUser",
        currentUser
        // {
        //     headers:{
        //         Authorization:`Bearer ${state.token}`,
        //     },
        // }
      );
      const { user, location } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location } });
      // addUserToLocalStorage({ user, location, token})
      // console.log(data);
    } catch (error) {
      // console.log(error.response);
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      clearAlert();
    }
  };

  const createCustomer = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const {
        customername,
        phonenumber,

        customerstatus,

        companypercentage,
        companypercentageOptionsInput,

        excesscashcustomer,
        excesscashcustomerOptionsInput,

        supportedornot,
        supportedornotOptionsInput,

        salarybank,
        salarybankOptionsInput,

        financebank,
        financebankOptionsInput,

        obligations,

        buildingPlace,
        buildingPlaceOptionsInput,
      } = state;
      let companypercentageResult,
        excesscashcustomerResult,
        customerstatusResult,
        supportedornotResult,
        salarybankResult,
        financebankResult,
        buildingPlaceResult;
      if (customerstatus === "other") {
        companypercentageResult = companypercentageOptionsInput;
      } else {
        companypercentageResult = customerstatus;
      }

      if (excesscashcustomer === "other") {
        excesscashcustomerResult = excesscashcustomerOptionsInput;
      } else {
        excesscashcustomerResult = excesscashcustomer;
      }
      if (companypercentage === "other") {
        customerstatusResult = companypercentageOptionsInput;
      } else {
        customerstatusResult = companypercentage;
      }
      if (supportedornot === "other") {
        supportedornotResult = supportedornotOptionsInput;
      } else {
        supportedornotResult = supportedornot;
      }
      if (salarybank === "other") {
        salarybankResult = salarybankOptionsInput;
      } else {
        salarybankResult = salarybank;
      }
      if (financebank === "other") {
        financebankResult = financebankOptionsInput;
      } else {
        financebankResult = financebank;
      }
      if (buildingPlace === "other") {
        buildingPlaceResult = buildingPlaceOptionsInput;
      } else {
        buildingPlaceResult = buildingPlace;
      }

      await authFetch.post("/customer", {
        customername,
        customerstatus: customerstatusResult,
        phonenumber,
        companypercentage: companypercentageResult,
        excesscashcustomer: excesscashcustomerResult,
        supportedornot: supportedornotResult,
        salarybank: salarybankResult,
        financebank: financebankResult,
        obligations: obligations,
        buildingPlace: buildingPlaceResult,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const editCustomer = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const {
        customername,
        phonenumber,

        customerstatus,

        companypercentage,
        companypercentageOptionsInput,

        excesscashcustomer,
        excesscashcustomerOptionsInput,

        supportedornot,
        supportedornotOptionsInput,

        salarybank,
        salarybankOptionsInput,

        financebank,
        financebankOptionsInput,

        obligations,

        buildingPlace,
        buildingPlaceOptionsInput,
      } = state;
      let companypercentageResult,
        excesscashcustomerResult,
        supportedornotResult,
        salarybankResult,
        financebankResult,
        buildingPlaceResult;

      if (excesscashcustomer === "other") {
        excesscashcustomerResult = excesscashcustomerOptionsInput;
      } else {
        excesscashcustomerResult = excesscashcustomer;
      }
      if (companypercentage === "other") {
        companypercentageResult = companypercentageOptionsInput;
      } else {
        companypercentageResult = companypercentage;
      }
      if (supportedornot === "other") {
        supportedornotResult = supportedornotOptionsInput;
      } else {
        supportedornotResult = supportedornot;
      }
      if (salarybank === "other") {
        salarybankResult = salarybankOptionsInput;
      } else {
        salarybankResult = salarybank;
      }
      if (financebank === "other") {
        financebankResult = financebankOptionsInput;
      } else {
        financebankResult = financebank;
      }
      if (buildingPlace === "other") {
        buildingPlaceResult = buildingPlaceOptionsInput;
      } else {
        buildingPlaceResult = buildingPlace;
      }
      await authFetch.patch(`/customer/${state.editCustomerId}`, {
        customername,
        customerstatus,
        phonenumber,
        companypercentage: companypercentageResult,
        excesscashcustomer: excesscashcustomerResult,
        supportedornot: supportedornotResult,
        salarybank: salarybankResult,
        financebank: financebankResult,
        obligations: obligations,
        buildingPlace: buildingPlaceResult,
      });
      dispatch({ type: EDIT_CUSTOMER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };
  const handleChange2 = ({ name, value }) => {
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  };
  const handleChange1 = ({ name, value }) => {
    dispatch({ type: "HANDLE_CHANGE1", payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createEmployee = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const {
        newcustomername,
        newcustomerusername,
        newcustomerpassword,
        addEmployeeCheckBox,
        allEmployeeCheckBox,
        editDeleteEmployeeCheckBox,
        addCustomerCheckBox,
        allCustomersCheckBox,
        editDeleteCustomerCheckBox,
      } = state;
      await authFetch.post("/auth/CreateUser", {
        name: newcustomername,
        username: newcustomerusername,
        password: newcustomerpassword,
        addEmployeeCheckBox,
        allEmployeeCheckBox,
        editDeleteEmployeeCheckBox,
        addCustomerCheckBox,
        allCustomersCheckBox,
        editDeleteCustomerCheckBox,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const getJobs = async () => {
    const { page, search, searchCustomerStatus, searchType, sort } = state;
    // console.log(search, searchStatus, searchType, sort);
    // if (searchCustomerStatus === "الجميع") {
    //   searchStatus = "all";
    // } else if (searchCustomerStatus === "عميل تم الانجاز") {
    //   searchStatus = "all";
    // }
    let url = `/customer?customerstatus=${searchCustomerStatus}`;
    // let url = `/customer?page=${page}customerstatus=${searchCustomerStatus}&jobType=${searchType}&sort=${sort}`;
    // if (search) {
    //   url = url + `&search=${search}`;
    // }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      console.log(data);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      // console.log(error);
      //   logoutUser();
    }
    clearAlert();
  };
  const getEmployee = async () => {
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(`/auth/allUsers`);
      console.log(data);
      const { users } = data;
      dispatch({
        type: GET_EMPLOYEE_SUCCESS,
        payload: { users },
      });
    } catch (error) {
      // console.log(error);
      //   logoutUser();
    }
    clearAlert();
  };
  const getCustomers = async () => {
    const {
      page,
      search,
      searchCustomerStatus,
      searchname,
      searchphoneNumber,
      sort,
    } = state;
    console.log(searchCustomerStatus);
    let url = `/customer?customerstatus=${searchCustomerStatus}&searchname=${searchname}&phoneNumber=${searchphoneNumber}&sort=${sort}`;
    dispatch({ type: GET_JOBS_BEGIN });
    console.log(url);
    try {
      const { data } = await authFetch(url);
      const { customers } = data;
      dispatch({
        type: GET_CUSTOMER_SUCCESS,
        payload: { customers },
      });
    } catch (error) {
      // console.log(error);
      //   logoutUser();
    }
    clearAlert();
  };
  const getMyCustomers = async () => {
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(`/auth/getSingleUserCustomers`);
      const { mycustomers } = data;
      dispatch({
        type: GET_MY_CUSTOMER_SUCCESS,
        payload: { mycustomers },
      });
    } catch (error) {
      // console.log(error);
      //   logoutUser();
    }
    clearAlert();
  };
  const setEditEmployee = (id) => {
    // console.log(`set edit employee ${id}`);
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const setEditCustomer = (id) => {
    // console.log(`set edit employee ${id}`);
    dispatch({ type: SET_EDIT_CUSTOMER, payload: { id } });
    console.log("out");
    console.log(state.companypercentage);
  };
  const deleteCustomer = async (id) => {
    // console.log(`set edit employee ${id}`);
    dispatch({ type: DELETE_CUSTOMER_BEGIN });
    try {
      await authFetch.delete(`/customer/${id}`);
      getCustomers();
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
  };
  //  const deleteJob = async (jobId) => {
  //     dispatch({ type: DELETE_JOB_BEGIN });
  //     try {
  //       await authFetch.delete(`/jobs/${jobId}`);
  //       getJobs();
  //     } catch (error) {
  //       // console.log(error.response);
  //       logoutUser();
  //     }
  //     // console.log(`set edit job ${id}`);
  //   };
  const editEmployee = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const {
        newcustomername,
        newcustomerusername,
        newcustomerpassword,
        addEmployeeCheckBox,
        allEmployeeCheckBox,
        editDeleteEmployeeCheckBox,
        addCustomerCheckBox,
        allCustomersCheckBox,
        editDeleteCustomerCheckBox,
      } = state;
      await authFetch.patch(`/auth/${state.editEmployeeId}`, {
        name: newcustomername,
        username: newcustomerusername,
        password: newcustomerpassword,
        addCustomerCheckBox,
        allCustomersCheckBox,
        editDeleteCustomerCheckBox,
        addEmployeeCheckBox,
        allEmployeeCheckBox,
        editDeleteEmployeeCheckBox,

        // permissions:{addEmployeeCheckBox,
        //   allEmployeeCheckBox,
        //   editDeleteEmployeeCheckBox,
        //   addCustomerCheckBox,
        //   allCustomersCheckBox,
        //   editDeleteCustomerCheckBox}
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
  // const deleteJob = async (jobId) => {
  //   dispatch({ type: DELETE_JOB_BEGIN });
  //   try {
  //     await authFetch.delete(`/jobs/${jobId}`);
  //     getJobs();
  //   } catch (error) {
  //     // console.log(error.response);
  //     logoutUser();
  //   }
  //   // console.log(`set edit job ${id}`);
  // };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      //by default authFetch will be get request if not specified
      const { data } = await authFetch("/customer/stats");
      console.log(data);
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, location } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        ToggleSideBar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createEmployee,
        createCustomer,
        getJobs,
        setEditEmployee,
        editEmployee,
        showStats,
        clearFilters,
        changePage,
        getCurrentUser,
        getEmployee,
        handleChange1,
        handleChange2,
        editCustomer,
        setEditCustomer,
        deleteCustomer,
        getCustomers,
        getMyCustomers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};
//export initial state and then setup the hook
//why hook?
export { AppProvider, initialState, useAppContext };
