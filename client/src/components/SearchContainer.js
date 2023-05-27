import { useMemo, useState } from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useAppContext } from "../context/appContext";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const {
    isLoading,
    sort,
    searchCustomerStatus,
    searchname,
    searchphoneNumber,
    sortOptionsAr,
    customerstatusOptions,
    handleChange,
    clearFilters,
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    console.log(e.target.name);
    console.log(e.target.value);
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    clearFilters();
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      // returning this from the function and use it in useMemo
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []); // i want to get it once
  return (
    <Wrapper>
      <form className="form">
        <h4>جدول البحث:</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="searchname"
            labelText={"الاسم:"}
            value={searchname}
            handleChange={handleSearch}

            // handleChange={optimizedDebounce}
          />
          <FormRow
            type="tel"
            name="searchphoneNumber"
            labelText={"رقم الهاتف:"}
            value={searchphoneNumber}
            handleChange={handleSearch}
            // handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="حالة الطلب:"
            name="searchCustomerStatus"
            value={searchCustomerStatus}
            handleChange={handleSearch}
            list={["الجميع", ...customerstatusOptions]}
          />

          <FormRowSelect
            name="sort"
            labelText="الترتيب:"
            value={sort}
            handleChange={handleSearch}
            list={sortOptionsAr}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
