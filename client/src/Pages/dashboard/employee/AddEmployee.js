// import { FormRow, Alert } from "../../../../components";
import { FormRow, Alert } from "../../../components";
import { useAppContext } from "../../../context/appContext";
import Wrapper from "../../../assets/wrappers/DashboardFormPage";
import CheckBox from "../../../components/checkBox";
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";

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

    handleChange,
    clearValues,
    createEmployee,
    editEmployee,
    user,
    userLoading,
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

    createEmployee();
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
  if (userLoading) return <Loading />;
  if (user.isAdmin === false && !user.permissions.addEmployee) {
    console.log("add Employee");
    return <Navigate to=".." />;
  }
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
              تاكيد
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              اعادة تعيين
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
