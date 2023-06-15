// doing 2 things for the current state
// and the action that is dispatch
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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_EMPLOYEE_CUSTOMER_BEGIN,
  CREATE_EMPLOYEE_CUSTOMER_SUCCESS,
  CREATE_EMPLOYEE_CUSTOMER_ERROR,
  GET_JOBS_BEGIN,
  SET_EDIT_JOB,
  SET_EDIT_CUSTOMER,
  DELETE_CUSTOMER_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  GET_EMPLOYEE_SUCCESS,
  HANDLE_CHANGE1,
  GET_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_SUCCESS,
  GET_MY_CUSTOMER_SUCCESS,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "الرجاء تعبئة المدخلات ",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // token:action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Created! Redirecting..",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // token:action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "Login Successful! Redirecting..",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSideBar: !state.showSideBar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      userLoading: false,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      // token:action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
      page: 1,
    };
  }

  if (action.type === HANDLE_CHANGE1) {
    return {
      ...state,
      obligations: {
        ...state.obligations,
        [action.payload.name]: action.payload.value,
      },
      page: 1,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      isEditingCustomer: false,
      editEmployeeId: "",
      position: "",
      company: "",
      jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
      statusOptions: ["interview", "declined", "pending"],

      newcustomername: "",
      customername: "",
      phonenumber: "",
      customerstatus: "الحسبة قيد الانتظار",
      newcustomerusername: "",
      newcustomerpassword: "",
      addEmployeeCheckBox: false,
      allEmployeeCheckBox: false,
      editDeleteEmployeeCheckBox: false,
      addCustomerCheckBox: false,
      allCustomersCheckBox: false,
      editDeleteCustomerCheckBox: false,
      salarybank: "الاهلي",
      financebank: "الاهلي",
      supportedornot: "مدعوم",
      excesscashcustomer: "قيد الانتظار",
      customerStatusOptionsInput: "",
      supportedornotOptionsInput: "",
      companypercentageOptionsInput: "",
      excesscashcustomerOptionsInput: "",
      salarybankOptionsInput: "",
      financebankOptionsInput: "",
      companypercentage: "",
      obligations: {
        personalloan: false,
        creditbank: false,
        developmentbank: false,
        car: false,
        yusrcompany: false,
        nayifat: false,
        other: "",
      },
    };
    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === CREATE_EMPLOYEE_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CREATE_EMPLOYEE_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CREATE_EMPLOYEE_CUSTOMER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      employees: action.payload.employees,
      //   jobs: action.payload.jobs,
      //   totalJobs: action.payload.totalJobs,
      //   numOfPages: action.payload.numOfPages,
      isLoading: false,
    };
  }
  if (action.type === GET_CUSTOMER_SUCCESS) {
    return {
      ...state,
      customers: action.payload.customers,
      //   jobs: action.payload.jobs,
      //   totalJobs: action.payload.totalJobs,
      //   numOfPages: action.payload.numOfPages,
      isLoading: false,
    };
  }
  if (action.type === GET_MY_CUSTOMER_SUCCESS) {
    return {
      ...state,
      mycustomers: action.payload.mycustomers,
      //   jobs: action.payload.jobs,
      //   totalJobs: action.payload.totalJobs,
      //   numOfPages: action.payload.numOfPages,
      isLoading: false,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const employees = state.employees.find(
      (employee) => employee._id === action.payload.id
    );
    const { _id, name, username, permissions } = employees;
    return {
      ...state,
      isEditing: true,
      editEmployeeId: _id,
      newcustomername: name,
      newcustomerusername: username,
      addEmployeeCheckBox: permissions.addEmployee,
      allEmployeeCheckBox: permissions.showAllEmployee,
      editDeleteEmployeeCheckBox: permissions.editAndDeleteEmployee,
      addCustomerCheckBox: permissions.addCustomer,
      allCustomersCheckBox: permissions.showAllCustomers,
      editDeleteCustomerCheckBox: permissions.editAndDeleteCustomer,
    };
  }
  if (action.type === SET_EDIT_CUSTOMER) {
    let customerToEdit;
    if (state.customers || state.customers.length === 0) {
      customerToEdit = state.mycustomers.find(
        (customer) => customer._id === action.payload.id
      );
      console.log("var");
      console.log(state.mycustomers);
      console.log(state.customers);
    } else {
      customerToEdit = state.customers.find(
        (customer) => customer._id === action.payload.id
      );
      console.log(state.customers);
      console.log("null");
    }

    const {
      _id,
      customername,
      phonenumber,
      customerstatus,
      companypercentage,
      excesscashcustomer,
      supportedornot,
      salarybank,
      financebank,
      obligations,
      buildingPlace,
    } = customerToEdit;

    let customerStatusOptionsInput;
    let companypercentageOptionsInput;
    let excesscashcustomerOptionsInput;
    let supportedornotOptionsInput;
    let salarybankOptionsInput;
    let financebankOptionsInput;
    let buildingPlaceOptionsInput;

    let customerStatusEdited;
    let companypercentageEdited;
    let excesscashcustomerEdited;
    let supportedornotEdited;
    let salarybankEdited;
    let financebankEdited;
    let buildingPlaceEdited;
    if (!state.customerstatusOptions.includes(customerstatus)) {
      // if the value is kfdskfksd input
      customerStatusOptionsInput = customerstatus; //fill the input
      customerStatusEdited = "عميل لم يوافق"; // last index
    }
    if (!state.companypercentageOptions.includes(companypercentage)) {
      companypercentageOptionsInput = companypercentage;
      companypercentageEdited = "other";
    }
    if (!state.excesscashcustomerOptions.includes(excesscashcustomer)) {
      excesscashcustomerEdited = "other";

      excesscashcustomerOptionsInput = excesscashcustomer;
    }
    if (!state.supportedornotOptions.includes(supportedornot)) {
      supportedornotEdited = "other";

      supportedornotOptionsInput = supportedornot;
    }
    if (!state.salarybankOptions.includes(salarybank)) {
      salarybankEdited = "other";

      salarybankOptionsInput = salarybank;
    }
    if (!state.financebankOptions.includes(financebank)) {
      financebankEdited = "other";

      financebankOptionsInput = financebank;
    }
    if (!state.buildingPlaceOptions.includes(buildingPlace)) {
      buildingPlaceEdited = "other";

      buildingPlaceOptionsInput = buildingPlace;
    }
    return {
      ...state,
      isEditingCustomer: true,
      editCustomerId: _id,
      customername,
      phonenumber,

      customerstatus: customerStatusEdited,
      customerStatusOptionsInput,

      companypercentage: companypercentageEdited,
      companypercentageOptionsInput,

      excesscashcustomer: excesscashcustomerEdited,
      excesscashcustomerOptionsInput,

      supportedornot: supportedornotEdited,
      supportedornotOptionsInput,

      salarybank: salarybankEdited,
      salarybankOptionsInput,

      financebank: financebankEdited,
      financebankOptionsInput,

      obligations,

      buildingPlace: buildingPlaceEdited,
      buildingPlaceOptionsInput,
    };
  }
  if (action.type === DELETE_CUSTOMER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "تم تحديث الموظف!",
    };
  }
  if (action.type === EDIT_CUSTOMER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "تم تحديث العميل!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      searchname: "",
      searchphoneNumber: "",
      searchCustomerStatus: "",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  if (action.type === GET_CURRENT_USER_BEGIN) {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    };
  }
  if (action.type === GET_CURRENT_USER_SUCCESS) {
    return {
      ...state,
      userLoading: false,
      showAlert: true,
      user: action.payload.user,
      userLocation: action.payload.location,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
