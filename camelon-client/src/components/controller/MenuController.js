import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Display from "../Display";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Filtter from "../Filtter";
import ColorType from "../ColorType";
import Heading from "../Heading";
import Card from "react-bootstrap/Card";
export default function MenuController() {
  const [state, setState] = useState({ mode: "overview" });
  const styleButton = {
    marginTop: "2%",
    height: "6em",
    width: "100%",
    borderRadius: 8,
  };
  var buttonClass =
    "flex items-center justify-center font-bold border border-black hover:bg-green-50";
  return (
    <>
      <Container>
        <Heading
          mainName="หน้าแรก"
          subName={(() => {
            if (state.mode === "overview") {
              return <span>ภาพรวม</span>;
            } else if (state.mode === "pin_map") {
              return <span>รายละเอียดข่าวอาชญากรรม</span>;
            } else if (state.mode === "heat_map") {
              return <span>แผนที่ความถี่อาชญากรรม</span>;
            } else if (state.mode === "choropleth_map") {
              return <span>แผนที่รายจังหวัด</span>;
            } else {
              <span>Overview</span>;
            }
          })()}
        />
        <Row
          xs
          style={{ marginBottom: "2%", height: "100%", fontFamily: "Kanit" }}
        >
          <Col sm>
            <button
              style={styleButton}
              onClick={() => setState({ mode: "overview" })}
              disabled={(() => {
                if (state.mode === "overview") {
                  return true;
                } else {
                  return false;
                }
              })()}
              class={buttonClass}
            >
              <div
                class="text-xl"
                style={{
                  color: state.mode === "overview" ? "#479B5F" : "black",
                }}
              >
                ข้อมูลสถิติ
              </div>
            </button>
          </Col>
          <Col sm>
            <button
              style={styleButton}
              onClick={() => setState({ mode: "pin_map" })}
              disabled={(() => {
                if (state.mode === "pin_map") {
                  return true;
                } else {
                  return false;
                }
              })()}
              class={buttonClass}
            >
              <div
                class="text-xl"
                style={{
                  color: state.mode === "pin_map" ? "#479B5F" : "black",
                }}
              >
                รายละเอียดจุดอาชญากรรม
              </div>
            </button>
          </Col>
          <Col sm>
            <button
              style={styleButton}
              onClick={() => setState({ mode: "heat_map" })}
              disabled={(() => {
                if (state.mode === "heat_map") {
                  return true;
                } else {
                  return false;
                }
              })()}
              class={buttonClass}
            >
              <div
                class="text-xl"
                style={{
                  color: state.mode === "heat_map" ? "#479B5F" : "black",
                }}
              >
                แผนที่ความถี่อาชญากรรม
              </div>
            </button>
          </Col>
          <Col sm>
            <button
              style={styleButton}
              onClick={() => setState({ mode: "choropleth_map" })}
              disabled={(() => {
                if (state.mode === "choropleth_map") {
                  return true;
                } else {
                  return false;
                }
              })()}
              class={buttonClass}
            >
              <div
                class="text-xl"
                style={{
                  color: state.mode === "choropleth_map" ? "#479B5F" : "black",
                }}
              >
                แผนที่รายจังหวัด
              </div>
            </button>
          </Col>
        </Row>

        <Row xs>
          <Col>
            {state.mode === "overview" || state.mode === "choropleth_map" ? (
              <div></div>
            ) : (
              <div>
                <Card>
                  <Filtter></Filtter>
                </Card>
                {state.mode === "pin_map" ? (
                  <Card style={{ marginTop: "1%" }}>
                    <ColorType></ColorType>
                  </Card>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </Col>
        </Row>
        <Display data={state.mode} />
      </Container>
    </>
  );
}
