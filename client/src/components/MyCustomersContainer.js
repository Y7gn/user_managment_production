import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import Customer from "./Customer";
import Wrapper from "../assets/wrappers/JobsContainer";
// import PageBtnContainer from "./PageBtnContainer";

const MyCustomersContainer = () => {
  const {
    getMyCustomers,
    mycustomers,
    isLoading,
    searchCustomerStatus,
    searchname,
    searchphoneNumber,
    sort,
    // totalCustomers,
    // search,
    // searchStatus,
    // searchType,
    // sort,
    // numOfPages,
    // page,
  } = useAppContext();

  useEffect(() => {
    getMyCustomers();
  }, [searchCustomerStatus, searchname, searchphoneNumber, sort]);
  //   search, searchStatus, searchType, sort, page
  if (isLoading) {
    return <Loading center />;
  }

  if (mycustomers.length === 0) {
    return (
      <Wrapper>
        <h2>لايوجد عملاء قيد العرض..</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5> لديك ({mycustomers.length}) عملاء:</h5>
      <div className="jobs">
        {mycustomers.map((customer) => {
          return <Customer key={customer._id} {...customer} noCreator={true} />;
        })}
      </div>
      {/* pagination button */}

      {/* {numOfPages > 1 && <PageBtnContainer />} */}
    </Wrapper>
  );
};

export default MyCustomersContainer;
