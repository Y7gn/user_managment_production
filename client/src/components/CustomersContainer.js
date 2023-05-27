import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Customer from "./Customer";
import Wrapper from "../assets/wrappers/JobsContainer";
// import PageBtnContainer from "./PageBtnContainer";

const CustomersContainer = () => {
  const {
    getCustomers,
    customers,
    isLoading,
    // totalCustomers,
    searchname,
    searchphoneNumber,
    searchCustomerStatus,
    sort,

    // numOfPages,
    // page,
  } = useAppContext();

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line
  }, [searchCustomerStatus, searchname, searchphoneNumber, sort]);
  // search, searchStatus, searchType, sort, page
  if (isLoading) {
    return <Loading center />;
  }

  if (customers.length === 0) {
    return (
      <Wrapper>
        <h2>لايوجد عملاء للعرض..</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>تم العثور على عدد ({customers.length}) عملاء:</h5>
      <div className="jobs">
        {customers.map((customer) => {
          return <Customer key={customer._id} {...customer} />;
        })}
      </div>
      {/* pagination button */}

      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default CustomersContainer;
