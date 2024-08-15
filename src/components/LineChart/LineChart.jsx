import Chart from "react-google-charts";
import { useEffect, useState } from "react";

const LineChart = ({ prev_data }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let datacopy = [["Date", "Prices"]];
    if (prev_data?.prices) {
      prev_data.prices.forEach((item) => {
        datacopy.push([
          new Date(item[0]).toLocaleDateString().slice(0, -5),
          item[1],
        ]);
      });
      setData(datacopy);
    }
  }, [prev_data]);

  return <Chart chartType="LineChart" data={data} width="100%" legendToggle />;
};

export default LineChart;
