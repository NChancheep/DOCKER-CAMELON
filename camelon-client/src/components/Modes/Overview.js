import React, { useState, useEffect } from "react";
import BarChart from "./chart/BarChart";
import RadarChart from "./chart/RadarChart";
import LineChart from "./chart/LineChart";
import PieChart from "./chart/PieChart";
import Timeline from "./chart/Timeline";

import "react-datepicker/dist/react-datepicker.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";

import CamelonApi from "../../api/CamelonApi";

export default function Overview() {
  const [startYear, setStartYear] = useState(2016);
  const [endYear, setEndYear] = useState(2020);
  const [crimeType, setCrimeType] = useState("");
  const [lineChartData, setLineChartData] = useState({});
  const [yearList, setYearList] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [specificYear, setSpecificYear] = useState("");
  const [raderChartData, setRadarChartData] = useState({});

  const [yearBarChart, setYearBarChart] = useState("");
  const [newsSource, setNewsSource] = useState("thairath");

  const [mode, setMode] = useState("lineChart");

  useEffect(() => {
    CamelonApi.get(`years`)
      .then((response) => {
        let year_list = response.data.map((data) => data.year);
        year_list = year_list.filter((year) => year >= 2010);
        console.log(year_list);
        setYearList(year_list);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (startYear > endYear) {
      alert("โปรดเลือกปีให้ถูกต้อง");
      setStartYear(2016);
      setEndYear(2020);
    }
  }, [startYear, endYear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      startYear: startYear,
      endYear: endYear,
      crimeType: crimeType,
      newsSource: newsSource,
    };

    setLineChartData(data);
  };

  const handleRaderChartSubmit = (e) => {
    e.preventDefault();
    const data = {
      year: specificYear,
    };

    setRadarChartData(data);
  };

  const handleStartYearChange = (e) => {
    setStartYear(e.target.value);
  };

  const handleEndYearChange = (e) => {
    setEndYear(e.target.value);
  };

  const handleCrimeTypeChange = (e) => {
    setCrimeType(e.target.value);
  };

  const handleSpecificYearChange = (e) => {
    setSpecificYear(e.target.value);
  };

  const handleMode = (e) => {
    setMode(e.target.value);
  };
  // function getCrimeTypeName(crimeTypeMetadata) {
  //   switch (crimeTypeMetadata) {
  //     case "SexualAbuse":
  //       return "การล่วงละเมิด";
  //     case "Murder":
  //       return "ฆาตกรรม";
  //     case "Gambling":
  //       return "การพนัน";
  //     case "Accident":
  //       return "อุบัติเหตุ";
  //     case "Theft_Burglary":
  //       return "ลักทรัพย์";
  //     case "Battery_Assault":
  //       return "ทำร้ายร่างกาย";
  //     case "Drug":
  //       return "ยาเสพติด";
  //     default:
  //       return "อื่นๆ";
  //   }
  // }

  return (
    <div
      class="sm"
      style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
    >
      {isPageLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        <Container style={{ width: "100%", fontFamily: "Kanit" }}>
          <Row>
            <Col xs>
              <Form>
                <Form.Group>
                  <Row>
                    <Col sm={4}>
                      <Form.Label>กรุณาเลือกระยะเวลาของปี</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          as="select"
                          value={startYear}
                          onChange={handleStartYearChange}
                        >
                          <option value="">
                            กรุณาเลือกปีที่ต้องการจะทราบข้อมูล
                          </option>
                          {yearList.map((val) => {
                            return <option value={val}>{val}</option>;
                          })}
                        </Form.Control>
                        <span className="mx-2 mt-2">ถึง</span>
                        <Form.Control
                          as="select"
                          value={endYear}
                          onChange={handleEndYearChange}
                        >
                          <option value="">
                            กรุณาเลือกปีที่ต้องการจะทราบข้อมูล
                          </option>
                          {yearList.map((val) => {
                            return <option value={val}>{val}</option>;
                          })}
                        </Form.Control>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <Form.Label>ประเภทแผนภูมิ</Form.Label>
                      <div className="d-flex">
                        <Form.Control
                          as="select"
                          value={mode}
                          onChange={handleMode}
                        >
                          <option value="" disabled>
                            กรุณาเลือกประเภทแผนภูมิ
                          </option>
                          <option value="lineChart">แผนภูมิเส้น</option>
                          <option value="barChart">แผนภูมิแท่ง</option>
                        </Form.Control>
                      </div>
                    </Col>
                    <Col>
                      <Form.Label>กรุณาเลือกประเภท</Form.Label>
                      <Form.Control
                        as="select"
                        value={crimeType}
                        onChange={handleCrimeTypeChange}
                        // disabled={mode === "lineChart" ? true : false}
                      >
                        <option value="">ทุกประเภท</option>
                        <option value="Accident">อุบัติเหตุ</option>
                        <option value="Battery/Assault">ทำร้ายร่างกาย</option>
                        <option value="Drug">ยาเสพติด</option>
                        <option value="Gambling">การพนัน</option>
                        <option value="Murder">ฆาตกรรม</option>
                        <option value="Sexual Abuse">การล่วงละเมิด</option>
                        <option value="Theft/Burglary">ลักทรัพย์</option>
                      </Form.Control>
                    </Col>
                    <Col>
                      <Row style={{ marginTop: "10.5%" }}>
                        <Button
                          type="submit"
                          variant="success"
                          onClick={handleSubmit}
                        >
                          ตกลง
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
              <Row style={{ marginTop: "2.5%" }}>
                <Col>
                  {mode === "barChart" ? (
                    <Col>
                      <BarChart data={lineChartData} />
                    </Col>
                  ) : mode === "lineChart" ? (
                    <Col>
                      <LineChart data={lineChartData} />
                    </Col>
                  ) : (
                    <div></div>
                  )}
                </Col>
                <Col>
                  <Col>
                    <Row>
                      <Col>
                        <RadarChart
                          style={{ width: "100%", height: "100%" }}
                          data={lineChartData}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Col>
            {/* <Col xs className="justify-content-center">
              <Form>
                <Form.Group>
                  <Form.Label>
                    กรุณาเลือกระยะเวลาของปีที่คุณต้องการจะทราบจำนวนข่าวอาชญากรรมที่เกิดขึ้นในแต่ละปี
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      as="select"
                      value={specificYear}
                      onChange={handleSpecificYearChange}
                    >
                      <option value="">เลือกทุกปี</option>
                      {yearList.map((val) => {
                        return <option value={val}>{val}</option>;
                      })}
                    </Form.Control>
                  </div>
                </Form.Group>
              </Form>
              <Row style={{ marginLeft: 1, marginRight: 1, marginTop: "3%" }}>
                <Button
                  type="submit"
                  variant="success"
                  onClick={handleRaderChartSubmit}
                >
                  ตกลง
                </Button>
              </Row>
              <Col>
                <Row>
                  <Col>
                    <RadarChart
                      style={{ width: "100%", height: "100%" }}
                      data={lineChartData}
                    />
                  </Col>
                </Row>
              </Col>
            </Col> */}
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Timeline data={lineChartData} />
          </Row>
          <Row className="justify-content-center" style={{ marginTop: "3%", color: "red", textAlign: "center" }}>
            ***รวบรวมข้อมูลข่าวตั้งเเต่ปี {yearList[0]} - {yearList.slice(-1)}
            ***
          </Row>

          <div style={{ marginBottom: "2%" }}></div>
        </Container>
      )}
    </div>
  );
}
