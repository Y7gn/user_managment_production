import { FormRow, Alert } from "../../components";
// FormRowSelect
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import CheckBox from "../../components/checkBox";

const AddEmployee = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    newcustomername,
    newcustomerusername,
    newcustomerpassword,
    addEmployeeCheckBox,
    allEmployeeCheckBox,
    editDeleteEmployeeCheckBox,
    addCustomerCheckBox,
    allCustomersCheckBox,
    editDeleteCustomerCheckBox,
    // jobLocation,
    // jobType,
    // jobTypeOptions,
    // status,
    // statusOptions,
    handleChange,
    clearValues,
    createJob,
    editEmployee,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      //eventually editJob()
      editEmployee();
      return;
    }
    if (!newcustomername || !newcustomerusername || !newcustomerpassword) {
      displayAlert();
      return;
    }

    createJob();
    clearValues();
    // console.log('create job');
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(`${name} : ${value}`);
    handleChange({ name, value });
  };
  const handleCheckBox = (e) => {
    const name = e.target.name;
    const value = e.target.checked;
    // console.log(`${name} : ${value}`);
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "التعديل على موظف" : "اضافة موظف جديد"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="newcustomername"
            labelText="الاسم:"
            value={newcustomername}
            handleChange={handleJobInput}
          />

          <FormRow
            type="text"
            name="newcustomerusername"
            labelText="اسم المستخدم:"
            value={newcustomerusername}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="newcustomerpassword"
            labelText="كلمة المرور:"
            value={newcustomerpassword}
            handleChange={handleJobInput}
          />

          <div className="addfirstdiv">
            <h4>صلاحيات (العملاء):</h4>

            <div className="checkboxContainer">
              <CheckBox
                type="checkbox"
                name="addCustomerCheckBox"
                value={addCustomerCheckBox}
                handleChange={handleCheckBox}
                labelText={"إضافة جميع العملاء"}
              />
              <CheckBox
                type="checkbox"
                name="allCustomersCheckBox"
                value={allCustomersCheckBox}
                handleChange={handleCheckBox}
                labelText={"عرض جميع العملاء"}
              />
              <CheckBox
                type="checkbox"
                name="editDeleteCustomerCheckBox"
                value={editDeleteCustomerCheckBox}
                handleChange={handleCheckBox}
                labelText={"تعديل وحذف العملاء"}
              />
            </div>
          </div>

          <div className="addseconddiv">
            <h4>صلاحيات (الموظفين):</h4>
            <div className="checkboxContainer">
              <CheckBox
                type="checkbox"
                name="addEmployeeCheckBox"
                value={addEmployeeCheckBox}
                handleChange={handleCheckBox}
                labelText={"إضافة موظف جديد"}
              />
              <CheckBox
                type="checkbox"
                name="allEmployeeCheckBox"
                value={allEmployeeCheckBox}
                handleChange={handleCheckBox}
                labelText={"عرض جميع الموظفين"}
              />
              <CheckBox
                type="checkbox"
                name="editDeleteEmployeeCheckBox"
                value={editDeleteEmployeeCheckBox}
                handleChange={handleCheckBox}
                labelText={"التعديل على الموظفين"}
              />
            </div>
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

export default AddEmployee;
// {
/* job status */
// }
// {
/* job type */
// }
// {
/* <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            labelText="type"
            handleChange={handleJobInput}
            list={jobTypeOptions}
          /> */
// }
