import React, { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import Card from "react-bootstrap/Card";
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const getCrimeTypeName = (crimeTypeMetadata) => {
  switch (crimeTypeMetadata) {
    case "SexualAbuse":
      return "การล่วงละเมิด";
    case "Murder":
      return "ฆาตกรรม";
    case "Gambling":
      return "การพนัน";
    case "Accident":
      return "อุบัติเหตุ";
    case "Theft_Burglary":
      return "ลักทรัพย์";
    case "Battery_Assault":
      return "ทำร้ายร่างกาย";
    case "Drug":
      return "ยาเสพติด";
    default:
      return "อื่นๆ";
  }
};

function LoadingIndicator() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
}

export default function RadarChart(props) {
  const { year } = props;
  const [crimeTypeList, setCrimeTypeList] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [dataSet, setDataSet] = useState({
    labels: [],
    datasets: [
      {
        label: "# of Crimes per 1000 peoples",
        data: [],
        backgroundColor: "#44985B",
        borderColor: "#6A717D",
        borderWidth: 1,
      },
    ],
  });

  const getCrimeType = () => {
    const options = {
      params: {
        year: year,
      },
    };
    Axios.get("http://localhost:3001/crimetypes_count", options)
      .then((response) => {
        setCrimeTypeList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsShow(false);
    getCrimeType();
  }, [year]);

  useEffect(() => {
    const labels = crimeTypeList.map((crime) =>
      getCrimeTypeName(crime.crime_type)
    );
    const data = {
      labels: labels,
      datasets: [
        {
          label: "# of Crimes per 1000 peoples",
          data: crimeTypeList.map((crime) => crime.crime_rate / 1000),
          backgroundColor: "#2D6A4F90",
          borderColor: "#6A717D00",
          borderWidth: 1,
        },
      ],
    };
    setDataSet(data);
  }, [crimeTypeList]);

  useEffect(() => {
    if (dataSet.datasets[0].data.length !== 0) {
      setIsShow(true);
    }
  }, [dataSet]);

  return isShow ? (
    <Card
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
      className="justify-content-center align-items-center"
    >
      <Radar data={dataSet} />
    </Card>
  ) : (
    <LoadingIndicator />
  );
}
