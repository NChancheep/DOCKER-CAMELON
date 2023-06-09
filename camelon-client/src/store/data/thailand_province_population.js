export function getThailandPopulation(provinceName) {
    const thailandPopulation = {
      "กรุงเทพมหานคร": 5694674,
      "สมุทรปราการ": 1227666,
      "นนทบุรี": 1158373,
      "ปทุมธานี": 1158080,
      "พระนครศรีอยุธยา": 883826,
      "อ่างทอง": 282104,
      "ลพบุรี": 782662,
      "สิงห์บุรี": 209876,
      "ชัยนาท": 329373,
      "สระบุรี": 637200,
      "ชลบุรี": 1554365,
      "ระยอง": 663238,
      "จันทบุรี": 522783,
      "ตราด": 256787,
      "ฉะเชิงเทรา": 739914,
      "ปราจีนบุรี": 441905,
      "นครนายก": 261471,
      "สระแก้ว": 574656,
      "นครราชสีมา": 2668227,
      "บุรีรัมย์": 1619215,
      "สุรินทร์": 1289788,
      "ศรีสะเกษ": 1693076,
      "อุบลราชธานี": 1787034,
      "ยโสธร": 540705,
      "ชัยภูมิ": 1105532,
      "อำนาจเจริญ": 385697,
      "หนองบัวลำภู": 510239,
      "ขอนแก่น": 1794832,
      "อุดรธานี": 1572834,
      "เลย": 644537,
      "หนองคาย": 509728,
      "มหาสารคาม": 992270,
      "ร้อยเอ็ด": 1445167,
      "กาฬสินธุ์": 955582,
      "สกลนคร": 1122825,
      "นครพนม": 736779,
      "มุกดาหาร": 352523,
      "เชียงใหม่": 1729886,
      "ลำพูน": 413233,
      "ลำปาง": 777764,
      "อุตรดิตถ์": 484524,
      "แพร่": 465679,
      "น่าน": 488527,
      "พะเยา": 487983,
      "เชียงราย": 1204402,
      "แม่ฮ่องสอน": 238676,
      "นครสวรรค์": 1141873,
      "อุทัยธานี": 327895,
      "กำแพงเพชร": 757499,
      "ตาก": 578304,
      "สุโขทัย": 602943,
      "พิษณุโลก": 869272,
      "พิจิตร": 531868,
      "เพชรบูรณ์": 996465,
      "ราชบุรี": 912276,
      "กาญจนบุรี": 842573,
      "สุพรรณบุรี": 869315,
      "นครปฐม": 1026837,
      "สมุทรสาคร": 541205,
      "สมุทรสงคราม": 205137,
      "เพชรบุรี": 508152,
      "ประจวบคีรีขันธ์": 536373,
      "ชุมพร": 498094,
      "ระนอง": 178590,"สุราษฎร์ธานี": 1040438,
      "พังงา": 172059,
      "ภูเก็ต": 413017,
      "กระบี่": 538028,
      "นครศรีธรรมราช": 1571074,
      "ตรัง": 659123,
      "พัทลุง": 505853,
      "สตูล": 324441,
      "สงขลา": 1455087,
      "ปัตตานี": 671536,
      "ยะลา": 524129,
      "นราธิวาส": 760195,
      "บึงกาฬ": 424091
    }
    return thailandPopulation[provinceName] || 0;

}
     
  