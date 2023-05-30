import { EmployeeContainer, SearchContainer } from "../../../components";
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/appContext";
const AllEmployee = () => {
  const { user, userLoading } = useAppContext();
  if (userLoading) return <Loading />;

  if (!user.permissions.showAllEmployee) {
    console.log("showAllEmployee");

    return <Navigate to="/" />;
  }
  return (
    <>
      {/* <SearchContainer /> */}
      <EmployeeContainer />
    </>
  );
};

export default AllEmployee;
