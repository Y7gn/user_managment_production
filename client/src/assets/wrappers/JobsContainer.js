import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  padding: 0 0rem;
  overflow: hidden;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .employee {
    display: grid;
    /* grid-template-columns: 1fr; */
    row-gap: 2rem;
  }
  @media (max-width: 767px) {
    .contentEmployee {
      flex-direction: column;
    }
    .idEmployee {
      font-size: 0.5rem;
    }
    .main-icon {
      margin-right: 0rem;
    }
    .actionsEmployee {
      margin-top: 1rem;
    }
    .info {
      flex-direction: column;
    }
    .custInfo {
      margin: 1rem 0rem;
    }
    header {
      display: flex;
      flex-direction: column;
    }
  }
  @media (min-width: 992px) {
    .jobs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .employee {
      display: grid;
      /* grid-template-columns: 1fr 1fr; */
      gap: 1rem;
    }
  }
`;
export default Wrapper;
