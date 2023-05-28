import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Customer";
import JobInfo from "./JobInfo";

const Job = ({
  _id,
  customername,
  customerstatus,
  phonenumber,
  salarybank,
  financebank,
  companypercentage,
  buildingPlace,
  obligations,
  createdBy,
  createdAt,
  noCreator,
}) => {
  const { setEditCustomer, deleteCustomer } = useAppContext();

  let date = moment(createdAt);
  date = date.format("MM Do, YYYY");
  let customerTheme;
  if (customerstatus === "عميل تم الانجاز") {
    customerTheme = "done";
  } else if (customerstatus === "الحسبة قيد الانتظار") {
    customerTheme = "pending";
  } else if (customerstatus === "عميل متردد") {
    customerTheme = "interview";
  } else {
    customerTheme = "declined";
  }

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{customername.charAt(0)}</div>
        <div className="info">
          <div>
            <h5>{customername}</h5>
            <p>{phonenumber}</p>
          </div>
          <div className="actions">
            <Link
              className="btn employeeedit-btn"
              to="/add-customer"
              onClick={() => setEditCustomer(_id)}
            >
              Edit
            </Link>
            <button
              className="btn employeedelete-btn"
              onClick={(e) => {
                // e.preventDefault()
                deleteCustomer(_id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </header>
      <div className="contentEmployee">
        {/* content center later */}
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={salarybank} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={companypercentage} />
          <JobInfo icon={<FaBriefcase />} text={financebank} />
          <JobInfo icon={<FaBriefcase />} text={buildingPlace} />
          {!noCreator && (
            <JobInfo icon={<FaBriefcase />} text={createdBy.name} />
          )}
          {/* <JobInfo icon={<FaBriefcase />} text={obligations} /> */}
          <div className={`status ${customerTheme}`}>{customerstatus}</div>
          {/* <div className={`status ${customerstatus}`}>{customerstatus}</div> */}
        </div>
        <footer></footer>
      </div>
    </Wrapper>
  );
};

export default Job;
