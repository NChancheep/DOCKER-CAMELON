import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Filtter.css";

function ColorType() {
  return (
    <Row
      xs
      style={{ height: "100%", padding: 10, fontFamily: "Kanit" }}
      className="justify-content-center align-items-center"
    >
      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#9400D3" }}>
            การพนัน
          </div>
        </div>
      </Col>
      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#4B0082" }}>
            ล่วงละเมิดทางเพศ
          </div>
        </div>
      </Col>
      <Col sm className="flex items-center justify-center"> 
        <div className="legend">
          <div className="legend" style={{ "--color": "#0000FF" }}>
            อุบัติเหตุ
          </div>
        </div>
      </Col>
      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#44985B" }}>
            ทำร้ายร่างกาย
          </div>
        </div>
      </Col>
      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#FFFF00" }}>
            ลักทรัพย์
          </div>
        </div>
      </Col>
      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#FF7F00" }}>
            ยาเสพติด
          </div>
        </div>
      </Col>

      <Col sm className="flex items-center justify-center">
        <div className="legend">
          <div className="legend" style={{ "--color": "#FF0000" }}>
            ฆาตกรรม
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ColorType;
