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
    name: "แจ้งเพลิงไหม้ดับเพลิง",
    callNum: "199",
    image:
      "https://upload.wikimedia.org/wikipedia/th/thumb/6/60/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%B3%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B4%E0%B8%87.png/150px-%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%95%E0%B8%B3%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%94%E0%B8%B1%E0%B8%9A%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%B4%E0%B8%87.png",
  },
  {
    id: "3",
    name: "ตำรวจท่องเที่ยว",
    callNum: "1155",
    image:
      "https://rayongtouristpolice.com/wp-content/uploads/2021/12/%E0%B9%82%E0%B8%A5%E0%B9%82%E0%B8%81%E0%B9%89%E0%B8%95%E0%B8%B3%E0%B8%A3%E0%B8%A7%E0%B8%88%E0%B8%97%E0%B9%88%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7-300x300.png",
  },
  {
    id: "4",
    name: "หน่วยกู้ชีพวชิรพยาบาล",
    callNum: "1554",
    image:
      "https://scontent.fbkk28-1.fna.fbcdn.net/v/t39.30808-6/327306726_1275401393040258_7040576077249823649_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHA2F5pFwtmHyZU80G_jOgqM5nem0L_Dsgzmd6bQv8OyMQ3B9cWpUu_7Bvt7zkrZ1cLv5bAt2OjL8CEzTEjqQtP&_nc_ohc=ksaZy5b9ehsAX8PfsXG&_nc_oc=AQk0FpUpdLfHSOQBwu_f7keJI2jZh4eN-SnFOu7KRai4xz77xidRrk_zT-AoL3YguuA&_nc_ht=scontent.fbkk28-1.fna&oh=00_AfB0AQh6oe8oImUSfXDV3PwqVvhfxfcA-l-E1eIih0bSxw&oe=6413EE11",
  },
  {
    id: "5",
    name: "กองปราบปราม",
    callNum: "1135",
    image:
      "https://esvector.net/home_es/images/stories/logo/10-11/police_fight.jpg",
  },
  {
    id: "6",
    name: "สายด่วนกรมทางหลวง",
    callNum: "1586",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Seal_of_the_Department_of_Highway_of_Thailand.svg",
  },
  {
    id: "7",
    name: "เหตุด่วนทางน้ำ",
    callNum: "1196",
    image:
      "http://marine.police.go.th/Pic%20Web/Logo%20TMP%202022.jpg",
  },
  {
    id: "8",
    name: "กรมป้องกันและบรรเทาสาธารณภัย",
    callNum: "1784",
    image:
      "https://www.disaster.go.th/th/images/LogoNav.png",
  },
  {
    id: "9",
    name: "ศูนย์ควบคุมและสั่งการจราจร",
    callNum: "1197",
    image:
      "http://www.trafficpolice.go.th/assets/traffic/di/logo.png",
  },
  {
    id: "10",
    name: "กรมทางพิเศษแห่งประเทศไทย",
    callNum: "1543",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Emblem_of_the_Expressway_Authority_of_Thailand.svg/600px-Emblem_of_the_Expressway_Authority_of_Thailand.svg.png",
  },
  {
    id: "11",
    name: "รับแจ้งรถหาย ถูกขโมย",
    callNum: "1192",
    image:
      "https://logo-th.com/wp-content/uploads/2018/12/%e0%b8%aa%e0%b8%b3%e0%b8%99%e0%b8%b1%e0%b8%81%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%95%e0%b8%b3%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b9%81%e0%b8%ab%e0%b9%88%e0%b8%87%e0%b8%8a%e0%b8%b2%e0%b8%95%e0%b8%b4.jpg",
  },
  {
    id: "13",
    name: "หน่วยแพทย์ฉุกเฉิน (กทม.)",
    callNum: "1646",
    image:
      "https://www.niems.go.th/1/Upload/migrate/File/256110121310483636_aiZMSdYTGgZzMsqk.png",
  },
  {
    id: "14",
    name: "หน่วยแพทย์ฉุกเฉิน (ทั่วไทย)",
    callNum: "1669",
    image:
      "https://test.niems.go.th/Web2019/UploadCK/Subwebsite/255601141508321334_eh6WOzbZxXrrNcmO.jpg",
  },
  {
    id: "15",
    name: "ศูนย์เตือนภัยพิบัติแห่งชาติ",
    callNum: "192",
    image:
      "https://scontent.fbkk12-5.fna.fbcdn.net/v/t39.30808-6/272949537_302929195201995_6445934003490367351_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHGdcp9CvV4_n8K23QdfUERYFykT0KGH1RgXKRPQoYfVIAro3e7tmHrJP1c1AfxffBdtEEGhAzPKyuYiaIhTvVH&_nc_ohc=AAcNDdDAxpQAX8iNV-g&_nc_ht=scontent.fbkk12-5.fna&oh=00_AfCgS18qJgueFITuUsVV3zMR6Ko6-QEp61FtW7njv7tLCw&oe=6412CABC",
  },
  {
    id: "16",
    name: "กองปราบปราม",
    callNum: "1195",
    image:
      "https://scontent.fbkk12-5.fna.fbcdn.net/v/t39.30808-6/272338252_302085875289886_8240862397192277179_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHXh8pQNGsdHpaiDrtfX3-u6h_4okgmMSDqH_iiSCYxILM849VROkVHFq8EOyaeQWrDw0FvAnBlM3wZO28QPMkc&_nc_ohc=BzQk5T9vK9oAX-x4dNS&_nc_ht=scontent.fbkk12-5.fna&oh=00_AfC8PWRhLG8Dm0DryIouHLTJJS_fcKnsk0TY9IIbUDK6Ig&oe=64133D22",
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
    name: "การไฟฟ้าส่วนภูมิภาค",
    callNum: "1129",
    image:
      "https://www.greennetworkthailand.com/wp-content/uploads/2020/01/pea.jpg",
  },
  {
    id: "20",
    name: "การไฟฟ้านครหลวง",
    callNum: "1130",
    image:
      "https://upload.wikimedia.org/wikipedia/th/3/38/MEA_Logo.png",
  },
  {
    id: "21",
    name: "การประปาส่วนภูมิภาค",
    callNum: "1662",
    image:
      "https://upload.wikimedia.org/wikipedia/th/thumb/f/f5/PWA_logo.jpg/1200px-PWA_logo.jpg",
  },
  {
    id: "22",
    name: "การประปานครหลวง",
    callNum: "1125",
    image:
      "https://upload.wikimedia.org/wikipedia/th/thumb/4/48/%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87.svg/1200px-%E0%B8%95%E0%B8%A3%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%A5%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%93%E0%B9%8C%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%9B%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87.svg.png",
  },
  {
    id: "23",
    name: "หน่วยแพทย์กู้ชีพกรุงเทพมหานคร",
    callNum: "1555",
    image:
      "http://vajirafoundation.org/wp-content/uploads/2021/11/smart.jpg",
  },
  {
    id: "24",
    name: "สายด่วนยาเสพติด กรมการแพทย์",
    callNum: "1165",
    image:
      "http://www.chulaari.chula.ac.th/wp-content/uploads/2018/10/%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C-%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%97%E0%B8%A3%E0%B8%A7%E0%B8%87%E0%B8%AA%E0%B8%B2%E0%B8%98%E0%B8%B2%E0%B8%A3%E0%B8%93%E0%B8%AA%E0%B8%B8%E0%B8%82.png",
  },
  {
    id: "25",
    name: "สายด่วนกรมสุขภาพจิต",
    callNum: "1323",
    image:
      "https://heretohealproject.com/wp-content/uploads/2022/07/29.jpg",
  },
];
function Overview() {
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
  
  export default Overview;