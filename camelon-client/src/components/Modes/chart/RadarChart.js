import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import Axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import CamelonApi from "../../../api/CamelonApi";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ data }) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // console.log(data)
  useEffect(() => {
    setIsLoading(true);
    setData1([]);
    setData2([]);
    if (Object.keys(data).length !== 0) {
      setIsFirstLoad(false);
      CamelonApi.get("news_crimes_statistics_per_year", {
        params: {
          yearStart: data.startYear,
          yearEnd: data.endYear
        },
      })
        .then((response) => {
          console.log(response.data)
          setData1(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

    }
  }, [data]);

  useEffect(() => {
    // console.log(data1)
    // console.log(data2)
    const options = {
      maintainAspectRatio: false,
      //responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text:
            data.year === ""
              ? `การเปรียบเทียบอาชญากรรมประเภทต่างๆ (ทุกปี)`
              : `การเปรียบเทียบอาชญากรรมประเภทต่างๆ (${data.startYear} - ${data.endYear})`,
        },
      },
    };


    let labels = data;
    
    if (data1.length !== 0) {
      // let datasets = []
      // let years = []
      // years = data1.map(data => data.year)
      // for (let i = 0; i < years.length; i++) {
      //   let data_result = []
      //   for(let j = 0; j < data1.length ; j++) {
      //     if(data1[j].year === years[i]) {
      //       delete data1[j].year
      //       data_result = Object.values(data1[j])
      //   }}

      //   let data_input = {
      //     label: years[i],
      //     data: data_result,
      //     borderColor: ['#1f77b450', '#ff7f0e50', '#2ca02c50', '#d6272870', '#9467bd70', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#f6c7b6'],
      //     backgroundColor: ['#1f77b450', '#ff7f0e50', '#2ca02c50', '#d6272870', '#9467bd70', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#f6c7b6'],
      //   }
      //   datasets.push(data_input)
      // }

      // let chart_data = {
      //   labels: ['Gambling', 'Murder', 'Sexual Abuse', 'Theft/Burglary', 'Drug', 'Battery/Assualt', 'Accident'],
      //   datasets: datasets,
      // };

      
      labels = data1.map(data => data.year)
      const index = labels.indexOf('year')
      if (index > -1) {
        labels.splice(index, 1)
      }
      delete data1[0].year 
      console.log(data1)
      var chart_data = {
        labels: Object.keys(data1[0]),
        datasets: [
          {
            label: "จำนวนข่าวอาชญากรรมเเต่ละประเภท",
            data: Object.values(data1[0]),
            borderColor: "#06B401",
            backgroundColor: "#06B40150",
          },
        ],
      };
    


    setChartData(chart_data);
    setOptions(options);
    if (data1.length !== 0) {
      setIsLoading(false);
      // console.log(data1.length)
      // console.log(data2.length)
    }
  }}, [data1, data2]);

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
        <div style={{ color: "#9c9c9c", fontSize: 14, marginTop:"3%" }}>
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
        <Radar style={{width:"100%",height:"100%"}} data={chartData} options={options} />
      )}
    </div>
  );
};

export default RadarChart;
