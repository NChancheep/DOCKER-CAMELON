import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import CamelonApi from "../../../api/CamelonApi";

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const Timeline = ({ data }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setData1([]);
    setData2([]);
    if (Object.keys(data).length !== 0) {
      setIsFirstLoad(false);

      CamelonApi.get(
        `news_crimes_summary?yearStart=${data.startYear}&yearEnd=${data.endYear}&crimeType=${data.crimeType}`
      )
        .then((response) => {
          console.log(response.data);
          setData1(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  useEffect(() => {
    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text:
            data.crimeType === ""
              ? `Timeline Frequency of Crime news (${data.startYear} to ${data.endYear})`
              : `Tineline Frequency of ${data.crimeType} Crime news (${data.startYear} to ${data.endYear})`,
        },
      },
    };
    let labels = null;
    if (data1.length !== 0) {
      
      labels = data1.map((data) => String(data.year + "-" +months[data.month]))
      var chart_data = {
        labels,
        datasets: [
          {
            label: "จำนวนข่าวอาชญากรรมต่อเดือน",
            data: data1.map((data) => data.Numbers),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
    }

    setChartData(chart_data);
    setOptions(options);
    if (data1.length !== 0) {
      setIsLoading(false);
      // console.log(data1.length)
      // console.log(data2.length)
    }
  }, [data.year, data1, data2, months]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {isFirstLoad ? (
        <div style={{ color: "#9c9c9c", fontSize: 14, marginTop: "3%" }}>
          **โปรดเลือกปีเพื่อเเสดงข้อมูล
        </div>
      ) : isLoading ? (
        <div style={{ margin: "25%" }}>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <Bar
          style={{ width: "100%", height: "100%" }}
          data={chartData}
          options={options}
        />
      )}
    </div>
  );
};

export default Timeline;
