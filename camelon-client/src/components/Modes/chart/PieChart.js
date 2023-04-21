import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Pie } from 'react-chartjs-2';

import { ThreeDots } from "react-loader-spinner";

import CamelonApi from "../../../api/CamelonApi";

const PieChart = ({ data }) => {
  // console.log(data)
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
      
        CamelonApi.get(`news_crimes_summary?yearStart=${data.startYear}&yearEnd=${data.endYear}`)
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
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text:
            data.crimeType === ""
              ? `Crime Incidents Covered in the News (${data.startYear}-${data.endYear})`
              : `${data.crimeType} Crime Incidents Covered in the News (${data.startYear}-${data.endYear})`,
        },
      },
    };

    const labels = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม' , 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    let datasets = []
    const years = []
    data1.forEach((data) => {
      const year = data.year;
      if(!years.includes(year)) {
        years.push(year);
      }
    });
  
    for(let i = 0; i < years.length; i++) {
      let data_result = []
      for(let j = 0; j < data1.length ; j++) {
        if(data1[j].year === years[i]) {
          data_result.push(data1[j].Numbers)
      }}

      let data_input = {
        label: years[i],
        data: data_result,
        pointRadius: 0,
        borderColor: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#f6c7b6'],
        backgroundColor:['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#63ed7a', '#ffa07a', '#add8e6', '#f08080', '#e6e6fa', '#9acd32', '#ba55d3'],
      }
      datasets.push(data_input)
    
    
  }
  
    let chart_data = {
      labels,
      datasets: datasets,
    };
    setChartData(chart_data);
    setOptions(options);
    if (data1.length !== 0) {
      setIsLoading(false);
      // console.log(data1.length)
      // console.log(data2.length)
    }
  }, [data.crimeType, data.endYear, data.startYear, data1, data2]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "100%",
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
        <Pie data={chartData} options={options} />
      )}
    </div>
  );
};

export default PieChart;
