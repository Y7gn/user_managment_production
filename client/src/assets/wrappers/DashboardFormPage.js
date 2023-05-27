import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .marginRow {
    margin-top: 1.5rem;
  }
  .formRowCheckbox {
    display: flex;
  }
  .form-center {
    /* display: grid; */
    /* row-gap: 0.5rem; */
  }
  .addfirstdiv,
  .addseconddiv {
    margin-top: 2rem;
  }

  .checkboxContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
  //check
  .containerchecks {
    display: inline-flex;
    margin-right: 20px;
    cursor: pointer;
    font-size: 1.1rem;
    user-select: none;
    align-items: end;
  }
  /* Style for the checkbox */
  .containerchecks input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  /* Style for the checkmark */
  .checkmark {
    position: relative;
    display: inline-block;
    height: 1.8rem;
    width: 1.8rem;
    background-color: #eee;
    margin-left: 1rem;
  }

  /* Style for the checked state of the checkbox */
  .containerchecks input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  /* Style for the checkmark when hovered over */
  /* .containerchecks:hover input ~ .checkmark {
    background-color: #ccc;
  } */

  /* Style for the label text */
  /* .containerchecks:hover {
    color: #2196f3;
  } */

  /* Style for the checked state of the label text */
  .containerchecks input:checked ~ span {
    color: #fff;
  }

  /* Style for the label text when hovered over */
  .containerchecks:hover span {
    color: #ccc;
  }

  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  /* .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 2rem;
    button {
      height: 35px;
    }
  } */
  .form-input-extra {
    height: 1.8rem;
  }
  .btn-container {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      height: 35px;
    }
  }
  .submit-btn {
    width: 15%;
    margin-left: 1rem;
    /* background-color: rgba(17, 101, 20, 0.76); */
    background: var(--green-dark);
    color: white;
  }
  .choosebtn {
    width: 15%;
  }

  .other-input {
    margin-right: 0.5rem;
    width: 15%;
  }
  .other-multiple {
    margin-right: 1rem;
  }
  .clear-btn {
    width: 15%;
    margin-left: 1rem;
    background-color: var(--red-dark);
  }
  .addfirstdiv {
    width: 100%;
  }
  /* .clear-btn {
    background: var(--grey-500);
  } */
  .clear-btn:hover {
    background: var(--black);
  }

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
      margin-top: 2rem;
      /* width: 30%; */
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
