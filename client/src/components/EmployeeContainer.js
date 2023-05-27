import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Employee from "./Employee";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";

const EmployeeContainer = () => {
  const { getEmployee, isLoading, totalJobs, numOfPages, page, employees } =
    useAppContext();

  // let Employeess = [
  //   {
  //     _id: 0,

  //     position: "myPOSITION0",
  //     company: "mycompany0",
  //     jobLocation: "mylocation0",
  //   },
  //   {
  //     _id: 1,

  //     position: "myPOSITION1",
  //     company: "mycompany1",
  //     jobLocation: "mylocation1",
  //   },
  //   {
  //     _id: 2,
  //     position: "myPOSITION2",
  //     company: "mycompany2",
  //     jobLocation: "mylocation2",
  //   },
  // ];
  useEffect(() => {
    getEmployee();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  if (employees.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display..</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        تم العثور على عدد ({employees.length}) موظفين:
        {/* {totalJobs} Employee {employee.length > 1 && "s"} found */}
      </h5>
      <div className="employee">
        {employees.map((employee) => {
          return <Employee key={employee._id} {...employee} />;
        })}
      </div>
      {/* pagination button */}

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default EmployeeContainer;
