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
      "./vajira1554.jpg",
  },
  {
    id: "3",
    name: "แพทย์ฉุกเฉิน",
    callNum: "1669",
    image:
      "./health1669.jpg",
  },
  {
    id: "4",
    name: "อุบัติเหตุทางน้ำ",
    callNum: "1196",
    image:
      "https://logo-th.com/wp-content/uploads/2018/12/%e0%b8%aa%e0%b8%b3%e0%b8%99%e0%b8%b1%e0%b8%81%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%95%e0%b8%b3%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b9%81%e0%b8%ab%e0%b9%88%e0%b8%87%e0%b8%8a%e0%b8%b2%e0%b8%95%e0%b8%b4.jpg",
  },
  {
    id: "5",
    name: "ศูนย์เอราวัณ",
    callNum: "1646",
    image:
      "https://pbs.twimg.com/profile_images/1369929848093732869/IIwxpm6X_400x400.jpg",
  },
  {
    id: "17",
    name: "สถานีวิทยุร่วมด้วยช่วยกัน",
    callNum: "1677",
    image:
      "https://obs.line-scdn.net/0hOBGuBXhqEG16DDycHJhvOkZJHgANIhYlAjlcWQ1bTlQFNFVoRD5eCgoORl8HNFY5R2laWA1bT11V",
  },
  {
    id: "18",
    name: "สถานีวิทยุ จส.100",
    callNum: "*1808",
    image:
      "https://static.mytuner.mobi/media/tvos_radios/TxRQrBB7gg.jpg",
  },
  {
    id: "19",
    name: "แจ้งเพลิงไหม้ดับเพลิง",
    callNum: "199",
    image:
      "https://upload.wikimedia.org/wikipedia/th/thumb/6/60/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%B3%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B4%E0%B8%87.png/150px-%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%B3%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B4%E0%B8%87.png",
  },
  {
    id: "23",
    name: "หน่วยแพทย์กู้ชีพกรุงเทพมหานคร",
    callNum: "1555",
    image:
      "./health1646.jpg",
  },
];
function Accident() {
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
  
  export default Accident;