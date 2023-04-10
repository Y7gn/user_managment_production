import moment from "moment";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Employee = ({
  _id,
  name,
  username,
  //   position,
  //   company,
  //   jobLocation,
  //   createdAt,
  //   status,
  //   jobType,
}) => {
  const { setEditEmployee, deleteJob } = useAppContext();

  //   let date = moment(createdAt);
  //   date = date.format("MM Do, YYYY");

  return (
    <Wrapper>
      {/* <header></head    er> */}
      <div className="contentEmployee">
        <div className="infoEmployee">
          <div className="main-icon">{name.charAt(0)}</div>
          <div className="allemployeeinfo">
            <h5>{_id}</h5>
            <h5>{username}</h5>
            <p>{name}</p>
          </div>
        </div>
        {/* content center later */}
        {/* <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div> */}
        {/* <footer> */}
        <div className="actionsEmployee">
          <Link
            className="btn employeeedit-btn"
            to="/add-employee"
            onClick={() => setEditEmployee(_id)}
          >
            Edit
          </Link>
          <button
            className="btn employeedelete-btn"
            onClick={(e) => {
              e.preventDefault();
              deleteJob(_id);
            }}
          >
            Delete
          </button>
        </div>
        {/* </footer> */}
      </div>
    </Wrapper>
  );
};

export default Employee;
