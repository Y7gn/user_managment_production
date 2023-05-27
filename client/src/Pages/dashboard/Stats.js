import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;

// border-radius: var(--borderRadius);
//     width: 100%;
//     background: var(--white);
//     padding: 3rem 2rem 4rem;
//     box-shadow: var(--shadow-2);
// }
