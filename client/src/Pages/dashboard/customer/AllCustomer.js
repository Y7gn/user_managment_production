import { CustomersContainer, SearchContainer } from "../../../components";
import { Navigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/appContext";

const AllCustomer = () => {
  const { userLoading, user } = useAppContext();
  if (userLoading) return <Loading />;

  if (!user.permissions.showAllCustomers) {
    console.log("showAllCustomers");
    return <Navigate to="/" />;
  }
  return (
    <>
      <SearchContainer />
      <CustomersContainer />
    </>
  );
};

export default AllCustomer;
