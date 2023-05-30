import { useAppContext } from "../../../context/appContext";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import {
  FormRow,
  Alert,
  FormRowSelect,
  CheckBoxOptions,
} from "../../../components";
import CheckBox from "../../../components/checkBox";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const AllCustomer = () => {
  const {
    isLoading,
    isEditingCustomer,
    showAlert,

    handleChange,
    handleChange1,
    clearValues,
    createCustomer,

    editCustomer,

    customername,
    phonenumber,

    customerstatus,
    customerstatusOptions,

    companypercentage,
    companypercentageOptions,
    companypercentageOptionsInput,

    excesscashcustomer,
    excesscashcustomerOptions,
    excesscashcustomerOptionsInput,

    supportedornot,
    supportedornotOptions,
    supportedornotOptionsInput,

    salarybank,
    salarybankOptions,
    salarybankOptionsInput,

    financebank,
    financebankOptions,
    financebankOptionsInput,

    obligations,

    buildingPlace,
    buildingPlaceOptions,
    buildingPlaceOptionsInput,
    displayAlert,
    user,
    userLoading,
    getCustomers,
    getMyCustomers,
  } = useAppContext();

  useEffect(() => {
    console.log("triggered");
  }, [isEditingCustomer]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!customername || !customerstatus) {
      displayAlert();
      return;
    }

    if (isEditingCustomer) {
      editCustomer();
      return;
    }
    createCustomer();
    getCustomers();
    getMyCustomers();
    console.log("create customer");
  };

  const handleChangeCheckBox = (e) => {
    console.log(e.target.type);
    let value;
    if (e.target.type === "text") {
      value = e.target.value;
    }
    if (e.target.type === "checkbox") {
      value = e.target.checked;
      if (value === "on") {
        value = true;
      }
      if (value === "off") {
        value = false;
      }
    }
    const name = e.target.name;

    // console.log(`${name} : ${value}`);

    handleChange1({ name, value });
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);

    handleChange({ name, value });
  };

  if (userLoading) return <Loading />;
  if (!user.permissions.addCustomer) {
    console.log("add customer");
    return <Navigate to="/" />;
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditingCustomer ? "التعديل على عميل:" : "اضافة عميل:"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="customername"
            value={customername}
            handleChange={handleJobInput}
            labelText="اسم العميل:"
          />
          <FormRow
            type="text"
            name="phonenumber"
            value={phonenumber}
            handleChange={handleJobInput}
            labelText="رقم الهاتف:"
          />
          <FormRowSelect
            name="customerstatus"
            value={customerstatus}
            handleChange={handleJobInput}
            list={customerstatusOptions}
            optionsIsActivated={false}
            labelText="حالة العميل:"
          />
          <FormRowSelect
            name="companypercentage"
            value={companypercentage}
            handleChange={handleJobInput}
            list={companypercentageOptions}
            optionsIsActivated={true}
            labelText="نسبة الشركة:"
            optionInputName="companypercentageOptionsInput"
            optionInputValue={companypercentageOptionsInput}
          />
          <FormRowSelect
            name="excesscashcustomer"
            value={excesscashcustomer}
            handleChange={handleJobInput}
            list={excesscashcustomerOptions}
            optionsIsActivated={true}
            labelText="الفائض الكاش للعميل:"
            optionInputName="excesscashcustomerOptionsInput"
            optionInputValue={excesscashcustomerOptionsInput}
          />
          <FormRowSelect
            name="supportedornot"
            value={supportedornot}
            handleChange={handleJobInput}
            list={supportedornotOptions}
            optionsIsActivated={true}
            labelText="مدعوم او غير مدعوم:"
            optionInputName="supportedornotOptionsInput"
            optionInputValue={supportedornotOptionsInput}
          />
          <FormRowSelect
            name="salarybank"
            value={salarybank}
            handleChange={handleJobInput}
            list={salarybankOptions}
            optionsIsActivated={true}
            labelText="بنك الراتب:"
            optionInputName="salarybankOptionsInput"
            optionInputValue={salarybankOptionsInput}
          />
          <FormRowSelect
            name="financebank"
            value={financebank}
            handleChange={handleJobInput}
            list={financebankOptions}
            optionsIsActivated={true}
            labelText="بنك التمويل:"
            optionInputName="financebankOptionsInput"
            optionInputValue={financebankOptionsInput}
          />

          <FormRowSelect
            name="buildingPlace"
            value={buildingPlace}
            handleChange={handleJobInput}
            list={buildingPlaceOptions}
            optionsIsActivated={true}
            labelText="موقع البناء:"
            optionInputName="buildingPlaceOptionsInput"
            optionInputValue={buildingPlaceOptionsInput}
          />

          <div
            className="marginRow formRow"
            style={{ display: "flex", alignItems: "end" }}
          >
            <label
              htmlFor="obligations"
              className="form-label"
              style={{ marginBottom: 0 }}
            >
              الالتزامات:
            </label>
            <div>
              <CheckBox
                type="checkbox"
                name="personalloan"
                value={obligations.personalloan}
                handleChange={handleChangeCheckBox}
                labelText={"امكان:"}
              />
              <CheckBox
                type="checkbox"
                name="creditbank"
                value={obligations.creditbank}
                handleChange={handleChangeCheckBox}
                labelText={"بنك التسليف:"}
              />
              <CheckBox
                type="checkbox"
                name="developmentbank"
                value={obligations.developmentbank}
                handleChange={handleChangeCheckBox}
                labelText={"بنك التنمية:"}
              />
              <CheckBox
                type="checkbox"
                name="car"
                value={obligations.car}
                handleChange={handleChangeCheckBox}
                labelText={"سيارة:"}
              />
              <CheckBox
                type="checkbox"
                name="yusrcompany"
                value={obligations.yusrcompany}
                handleChange={handleChangeCheckBox}
                labelText={"شركة اليسر:"}
              />
              <CheckBox
                type="checkbox"
                name="nayifat"
                value={obligations.nayifat}
                handleChange={handleChangeCheckBox}
                labelText={"نايفات:"}
              />
            </div>
            <FormRow
              type="text"
              name="other"
              value={obligations.other}
              handleChange={handleChangeCheckBox}
              labelText="اخرى:"
            />
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AllCustomer;
