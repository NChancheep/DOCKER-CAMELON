import React from "react";
import EmergencyBanner from "../../cards/EmerContact";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
const EmerContact = [
  {
    id: "1",
    name: "แจ้งเหตุด่วนเหตุร้าย",
    callNum: "191",
    image:
      "https://logo-th.com/wp-content/uploads/2018/12/%e0%b8%aa%e0%b8%b3%e0%b8%99%e0%b8%b1%e0%b8%81%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%95%e0%b8%b3%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b9%81%e0%b8%ab%e0%b9%88%e0%b8%87%e0%b8%8a%e0%b8%b2%e0%b8%95%e0%b8%b4.jpg",
  },
  {
    id: "4",
    name: "หน่วยกู้ชีพวชิรพยาบาล",
    callNum: "1554",
    image:
      "./vajira1554.jpg",
  },
  {
    id: "5",
    name: "กองปราบปราม",
    callNum: "1135",
    image:
      "https://esvector.net/home_es/images/stories/logo/10-11/police_fight.jpg",
  },
  {
    id: "14",
    name: "หน่วยแพทย์ฉุกเฉิน (ทั่วไทย)",
    callNum: "1669",
    image:
      "./health1669.jpg",
  },
];
function Gambling() {
  return (
    <main>
      <Row>
        {EmerContact.map((data) => (
          <Col sm={4} key={data.id}>
            <EmergencyBanner
              images={data.image}
              Name={data.name}
              callNum={data.callNum}
            />
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default Gambling;
