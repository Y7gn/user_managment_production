import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import StatItem from "./StatItem";
import Wrapper from "../assets/wrappers/StatsContainer.js";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "عميل تم الانجاز",
      count: stats.done || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "الحسبة قيد الانتظار",
      count: stats.waiting || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "عميل متردد",
      count: stats.unsure || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        // console.log(index);
        return <StatItem key={index} {...item} />;
      })}
      {/* <h1>Stats Container</h1> */}
    </Wrapper>
  );
};

export default StatsContainer;
