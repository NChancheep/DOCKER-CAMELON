import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Heading from "../Heading";
import Card from "react-bootstrap/Card";

import NavbarEmer from "../NavbarEmer";

export default function EmerController() {
  const [state, setState] = useState({mode: "Overview"});

  return (
    <>
      <Container className={`nav-bar-select-locati`} style={{ height: 55, }}>
        <Heading
          mainName="เบอร์ติดต่อฉุกเฉิน"
          subName={(() => {
            if (state.mode === "Overview") {
              return <span>เบอร์ติดต่อทั้งหมด</span>;
            } else if (state.mode === "Gambling") {
              return <span>การพนัน</span>;
            } else if (state.mode === "Murder") {
              return <span>ฆาตกรรม</span>;
            } else if (state.mode === "SexualAbuse") {
              return <span>การล่วงละเมิดทางเพศ</span>;
            } else if (state.mode === "TheftBurglary") {
              return <span>ลักทรัพย์</span>;
            } else if (state.mode === "BatteryAssault") {
              return <span>ทำร้ายร่างกาย</span>;
            } else if (state.mode === "Drug") {
              return <span>ยาเสพติด</span>;
            } else if (state.mode === "Accident") {
              return <span>อุบัติเหตุ</span>;
            } else {
              <span>{state.mode}</span>;
            }
          })()}
        />
        <Card>
          <Row
            xs
            style={{ height: "100%", padding: 10, fontFamily: "Kanit"  }}
            //className="rectangle-1378"
          >
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "Overview" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "Overview" })}
              >
                <div
                  style={{
                    color: state.mode === "Overview" ? "#479B5F" : "black",
                  }}
                >
                  เบอร์ติดต่อทั้งหมด
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "Gambling" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "Gambling" })}
              >
                <div
                  style={{
                    color: state.mode === "Gambling" ? "#479B5F" : "black",
                  }}
                >
                  การพนัน
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "Murder" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "Murder" })}
              >
                <div
                  style={{
                    color: state.mode === "Murder" ? "#479B5F" : "black",
                  }}
                >
                  ฆาตกรรม
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "SexualAbuse" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "SexualAbuse" })}
              >
                <div
                  style={{
                    color: state.mode === "SexualAbuse" ? "#479B5F" : "black",
                  }}
                >
                  การล่วงละเมิด
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "TheftBurglary" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "TheftBurglary" })}
              >
                <div
                  style={{
                    color: state.mode === "TheftBurglary" ? "#479B5F" : "black",
                  }}
                >
                  ลักทรัพย์
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "BatteryAssault" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "BatteryAssault" })}
              >
                <div
                  style={{
                    color:
                      state.mode === "BatteryAssault" ? "#479B5F" : "black",
                  }}
                >
                  ทำร้ายร่างกาย
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "Drug" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "Drug" })}
              >
                <div
                  style={{
                    color: state.mode === "Drug" ? "#479B5F" : "black",
                  }}
                >
                  ยาเสพติด
                </div>
              </button>
            </Col>
            <Col sm>
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 4,
                  backgroundColor:
                    state.mode === "Accident" ? "#47474725" : "white",
                }}
                onClick={() => setState({ mode: "Accident" })}
              >
                <div
                  style={{
                    color: state.mode === "Accident" ? "#479B5F" : "black",
                  }}
                >
                  อุบัติเหตุ
                </div>
              </button>
            </Col>
          </Row>
        </Card>
        <NavbarEmer data={state.mode} />
      </Container>
    </>
  );
}
