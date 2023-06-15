import React, { useState } from "react";
import BarChart from "./BarChart";
import AreaChart from "./AreaChartComponent";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h5>العمليات الشهرية</h5>
      <button
        type="button"
        onClick={() => setBarChart(!barChart)}
        className="statsButton"
      >
        {barChart ? "تخطيط مساحي" : "خريطة أعمدة"}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
