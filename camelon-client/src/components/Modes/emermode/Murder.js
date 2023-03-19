import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import EmergencyBanner from "../../cards/EmerContact";
const EmerContact = [
  {
    id: "1",
    name: "แจ้งเหตุด่วนเหตุร้าย",
    callNum: "191",
    image:
      "https://logo-th.com/wp-content/uploads/2018/12/%e0%b8%aa%e0%b8%b3%e0%b8%99%e0%b8%b1%e0%b8%81%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%95%e0%b8%b3%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b9%81%e0%b8%ab%e0%b9%88%e0%b8%87%e0%b8%8a%e0%b8%b2%e0%b8%95%e0%b8%b4.jpg",
  },
  {
    id: "2",
    name: "หน่วยกู้ชีพวชิรพยาบาล",
    callNum: "1554",
    image:
      "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/327306726_1275401393040258_7040576077249823649_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHA2F5pFwtmHyZU80G_jOgqM5nem0L_Dsgzmd6bQv8OyMQ3B9cWpUu_7Bvt7zkrZ1cLv5bAt2OjL8CEzTEjqQtP&_nc_ohc=t_PUNzhM23gAX_c3zBI&_nc_oc=AQmB7upZ7NUdPvsgzaUiTxUDhONN0p-rboR4r_OuVfUR-QIzQqJB9AWknBfPIaD0Kgk&_nc_ht=scontent.fbkk28-1.fna&oh=00_AfCQFoe1tG3b8ePcpPNBr41iVMNSzZdFpG4WMsashzXSzA&oe=6419DCD1",
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
      "https://test.niems.go.th/Web2019/UploadCK/Subwebsite/255601141508321334_eh6WOzbZxXrrNcmO.jpg",
  },
  {
    id: "23",
    name: "หน่วยแพทย์กู้ชีพกรุงเทพมหานคร",
    callNum: "1555",
    image:
      "http://vajirafoundation.org/wp-content/uploads/2021/11/smart.jpg",
  },
];
function Murder() {
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

export default Murder;