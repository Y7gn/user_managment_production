import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import {
  FormRow,
  Alert,
  FormRowSelect,
  CheckBoxOptions,
} from "../../components";
import CheckBox from "../../components/checkBox";
import { useEffect, useState } from "react";

const AllCustomer = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    customerstatus,
    customerstatusOptions,
    handleChange,
    handleChange1,
    clearValues,
    createJob,
    editJob,

    customername,
    phonenumber,

    companypercentage,
    companypercentageOptions,
    excesscashcustomer,
    excesscashcustomerOptions,
    supportedornot,
    supportedornotOptions,
    salarybank,
    salarybankOptions,
    financebank,
    financebankOptions,
    obligations,
    obligationsOptions,
    buildingPlace,
    buildingPlaceOptions,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(status);
    // console.log();

    // if (!position || !company || !jobLocation) {
    //   displayAlert();
    //   return;
    // }

    // if (isEditing) {
    //   //eventually editJob()
    //   editJob();
    //   return;
    // }
    // createJob();
    // console.log('create job');
  };

  // const [setObligation1, obligations1] = useState(
  //   obligationsOptions.reduce(
  //     (acc, option) => ({ ...acc, [option]: false }),
  //     {}
  //   )
  // );

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

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
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
            optionsIsActivated={true}
            labelText="حالة العميل:"
          />
          <FormRowSelect
            name="companypercentage"
            value={companypercentage}
            handleChange={handleJobInput}
            list={companypercentageOptions}
            optionsIsActivated={true}
            labelText="نسبة الشركة:"
          />
          <FormRowSelect
            name="excesscashcustomer"
            value={excesscashcustomer}
            handleChange={handleJobInput}
            list={excesscashcustomerOptions}
            optionsIsActivated={true}
            labelText="الفائض الكاش للعميل:"
          />
          <FormRowSelect
            name="supportedornot"
            value={supportedornot}
            handleChange={handleJobInput}
            list={supportedornotOptions}
            optionsIsActivated={true}
            labelText="مدعوم او غير مدعوم:"
          />
          <FormRowSelect
            name="salarybank"
            value={salarybank}
            handleChange={handleJobInput}
            list={salarybankOptions}
            optionsIsActivated={true}
            labelText="بنك الراتب:"
          />
          <FormRowSelect
            name="financebank"
            value={financebank}
            handleChange={handleJobInput}
            list={financebankOptions}
            optionsIsActivated={true}
            labelText="بنك التمويل:"
          />
          <FormRowSelect
            name="obligations"
            value={obligations}
            handleChange={handleJobInput}
            list={obligationsOptions}
            optionsIsActivated={true}
            labelText="بنك التمويل:"
          />
          <FormRowSelect
            name="buildingPlace"
            value={buildingPlace}
            handleChange={handleJobInput}
            list={buildingPlaceOptions}
            optionsIsActivated={true}
            labelText="موقع البناء:"
          />

          <div className="formRow">
            <CheckBox
              type="checkbox"
              name="personalloan"
              value={obligations.personalloan}
              handleChange={handleChangeCheckBox}
              labelText={"إضافة جميع العملاء"}
            />
            <CheckBox
              type="checkbox"
              name="creditbank"
              value={obligations.creditbank}
              handleChange={handleChangeCheckBox}
              labelText={"عرض جميع العملاء"}
            />
            <CheckBox
              type="checkbox"
              name="developmentbank"
              value={obligations.developmentbank}
              handleChange={handleChangeCheckBox}
              labelText={"تعديل وحذف العملاء"}
            />
            <CheckBox
              type="checkbox"
              name="car"
              value={obligations.car}
              handleChange={handleChangeCheckBox}
              labelText={"تعديل وحذف العملاء"}
            />
            <CheckBox
              type="checkbox"
              name="yusrcompany"
              value={obligations.yusrcompany}
              handleChange={handleChangeCheckBox}
              labelText={"تعديل وحذف العملاء"}
            />
            <CheckBox
              type="checkbox"
              name="nayifat"
              value={obligations.nayifat}
              handleChange={handleChangeCheckBox}
              labelText={"تعديل وحذف العملاء"}
            />
            <FormRow
              type="text"
              name="other"
              value={obligations.other}
              handleChange={handleChangeCheckBox}
              labelText="اخرى:"
            />
          </div>
          {/* <CheckBoxOptions
            type="checkbox"
            name="addCustomerCheckBox"
            value={addCustomerCheckBox}
            handleChange={handleCheckBox}
            labelText={"إضافة جميع العملاء"}
          /> */}
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
              className="btn btn-block submit-btn"
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
