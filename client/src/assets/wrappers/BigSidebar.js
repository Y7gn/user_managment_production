import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;

  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);

    .sidebar-container {
      background: var(--white);
      min-height: 100vh;
      height: 100%;
      width: 335px;
      margin-right: -340px;
      transition: var(--transition);
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-right: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-right: 2.5rem;
    }
    .nav-links {
      /* padding-top: 2rem; */
      display: flex;
      flex-direction: column;
    }
    .nav-item {
      display: flex;
      width: 100%;
      justify-content: "center";
    }
    .nav-item:first {
      display: flex;
      width: 100%;
      justifycontent: "center";
      /* alignItems:"center" */
    }
    .nav-item:first-child {
      margin-top: var(--nav-height);
      /* alignItems:"center" */
    }
    .extra {
      flex-direction: column;
      align-items: center;
    }

    .dropdown-child {
      margin-top: 0.4rem;
    }
  }
  .dropdown-menu {
    width: 100%;
    margin: 0;
  }
  .dropdownmenu-item {
    background-color: var(--boxgrey);
    display: flex;
    alignitems: center;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    /* padding-left: 2.5rem; */
    text-transform: capitalize;
    transition: var(--transition);
    /* justify-content: center; */
    justify-content: flex-start;
    /* padding-right: 5rem; */
    font-weight: 500;
    font-size: 1.2rem;
    padding: 1rem 2.5px 1rem 0rem;
  }
  .dropdownbtn {
    transition: all 0.5s;
    display: flex;
    align-items: center;
    width: 100%;
  }
  .dropdown-toggle {
    background: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 4rem;
    padding-left: 2rem;
    padding-top: 1.1rem;
    padding-bottom: 1.1rem;
  }
  .dropdownmenu-item {
    /* padding: 1rem 0rem; */
    display: flex;
    justify-content: flex-start;
    background-color: var(--boxgrey);
    border-bottom: 1px solid #a7a7a740;
    padding: 1.3rem 0rem;
  }
  .dropdownmenu-item:first-child {
    border-bottom: 1px solid #a7a7a740;
  }
  .dropdown-itemcontainer {
    /* display: flex; */
    /* justify-content: center; */
    margin-right: 4rem;
  }
  .nav-link:first-child {
    margin-top: var(--nav-height);
  }
  .dropdownbtn:hover {
    /* background: var(--grey-50); */
    padding-right: 3rem;
    color: var(--grey-900);
  }

  .dropdown-toggle {
    border: none;
    width: 100%;
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 2rem;
    margin-left: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active .dropdown-toggle,
  .indexHover {
    background-color: rgba(105, 90, 165, 0.33);
    /* color: red; */
    /* color: var(--grey-900); */
  }
  .dropdownmenu-item.active {
    background-color: rgba(95, 95, 95, 0.31);
  }

  .active .icon {
    /* color: var(--primary-500); */
    /* color: red; */
  }
  .dropdown-icon {
    cursor: pointer;
  }
  .red-background {
    background-color: rgba(105, 90, 165, 0.33);
    /* box-shadow: -2px 0px 2px 2px; */
    box-shadow: 0px 6px 13px -9px rgba(0, 0, 0, 1.2);
  }
  .dropdown-itemtext {
    letter-spacing: 0rem;
    text-decoration: none;
    color: black;
  }
`;
export default Wrapper;
