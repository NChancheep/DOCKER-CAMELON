import React, { useState } from "react";
import BarChart from "./chart/BarChart";
import RadarChart from "./chart/RadarChart";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-datepicker/dist/react-datepicker.css";

export default function Overview() {

  const [year, setYear] = useState("all_year");
  const [yearBarChart, setYearBarChart] = useState("all_year");
  const [yearBarChart2, setYearBarChart2] = useState("all_year");
  const year_list = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023,
  ];
  return (
    <div class="sm" style={{ marginTop: 16 }}>
      <Container style={{width:"100%", fontFamily: "Kanit" }}>
        <Row xs >
          <Col sm={6} style={{height:"100%"}}>
            <select
              onChange={(e) => {
                setYearBarChart(e.target.value);
              }}
            >
              <option value="" disabled selected>
                เลือกปี
              </option>
              {year_list.map((year) => {
                return <option value={year}>{year}</option>;
              })}
              <option value="all_year" selected>
                เลือกทุกปี
              </option>
            </select>
            <BarChart year={yearBarChart} />
            <div style={{marginBottom:"2%"}}></div>
            <select
              onChange={(e) => {
                setYearBarChart2(e.target.value);
              }}
            >
              <option value="" disabled selected>
                เลือกปี
              </option>
              {year_list.map((year) => {
                return <option value={year}>{year}</option>;
              })}
              <option value="all_year" selected>
                เลือกทุกปี
              </option>
            </select>
            <BarChart year={yearBarChart2} />
          </Col>
          <Col sm={6} style={{height:"100%"}}>
            <select
            
              onChange={(e) => {
                setYear(e.target.value);
              }}
            >
              <option value="" disabled>
                เลือกปี
              </option>
              {year_list.map((year) => {
                return <option value={year}>{year}</option>;
              })}
              <option value="all_year" selected>
                เลือกทุกปี
              </option>
            </select>
            <RadarChart year={year} />
          </Col>
        </Row>
        <div style={{marginBottom:"10%"}}></div>
      </Container>
    </div>
  );
}
