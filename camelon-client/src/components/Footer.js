import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <Row>
        <section className="d-flex justify-content-center justify-content-lg-between p-4">
          <Col
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <h4 style={{ fontSize: 16, textAlign: "center" }}>
              <span>National software contest 2023</span>
            </h4>
          </Col>
          <Col
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <div>
              <h4 style={{ fontSize: 16, textAlign: "center" }}>
                The Faculty of Information and Communication Technology, Mahidol
                University
              </h4>
            </div>
          </Col>
          <Col
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <h4 style={{ fontSize: 16, textAlign: "center" }}>
              <span>Camelon Team</span>
            </h4>
          </Col>
        </section>
      </Row>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 ICT Mahidol University:{" "}
        <span className="text-reset fw-bold">
          Camelon
        </span>
      </div>
    </MDBFooter>
  );
}
