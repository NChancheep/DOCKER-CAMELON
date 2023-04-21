import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";

import { useSelector } from "react-redux";
import "../../css/ChoroplethMap.css";
import "../../css/setfont.css";
import GaugeChart from "react-gauge-chart";
import { polygon, point, booleanPointInPolygon } from "@turf/turf";
import { getThailandPopulation } from "../../store/data/thailand_province_population.js";
import CamelonApi from "../../api/CamelonApi";

export default function ChoroplethMap() {
  const { thailandGeoJson } = useSelector((state) => state.data);
  const { locations } = useSelector((state) => state.data);
  const { news_info } = useSelector((state) => state.data);
  let features = thailandGeoJson[0].features;
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [data, setData] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [provinceCrimes, setProvinceCrimes] = useState([]);
  // Add a state variable to keep track of whether the button has been clicked
  const [showRank, setShowRank] = useState(false);

  // Define a function to handle the button click event
  const handleShowRank = () => {
    // let string = "15 อันดับจังหวัดที่มีอาชญกรรมสูงสุด"
    // provinceCrimes.slice(0, 15).map((province,index) => {
    //   string += "\n" + parseInt(index +1) + " " + province.province
    // }
    // )
    // alert(string);
    setShowRank(!showRank);
  };

  useEffect(() => {
    CamelonApi.get(`provinces_statistics`)
      .then((response) => {
        setProvinceCrimes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (provinceCrimes.length !== 0) {
      const crimeRateData = addCrimeRate(features);
      setData(crimeRateData);
      setIsShow(true);
    }
  }, [provinceCrimes]);

  // useEffect(() => {
  //   if (data) {
  //     setIsShow(true)
  //   }
  // }, [data])

  function addCrimeRate(data) {
    return data.map((item) => ({
      ...item,
      crime_rate: getCrimeRateAndMeter(
        item.geometry.coordinates[0],
        item.properties.NL_NAME_1
      ).crime_rate,
      crime_meter: getCrimeRateAndMeter(
        item.geometry.coordinates[0],
        item.properties.NL_NAME_1
      ).crime_meter,
    }));
  }

  // useEffect(() => {
  //   const crimeRateData = addCrimeRate(features);
  //   setData(crimeRateData);
  // }, [provinceCrimes]);

  // Show pin map once data is available
  // useEffect(() => {
  //   if (data) {
  //     setIsShow(true);
  //   }
  // }, [data]);

  function getCrimeWeight(crimeTypeMetadata) {
    switch (crimeTypeMetadata) {
      case "SexualAbuse":
        return 2;
      case "Murder":
        return 4;
      case "Gambling":
        return 1;
      case "Accident":
        return 1;
      case "Theft_Burglary":
        return 3;
      case "Battery_Assault":
        return 2;
      case "Drug":
        return 2;
      default:
        return 1;
    }
  }

  function getCrimeRateAndMeter(coordinates, name) {
    const province = provinceCrimes.filter((item) => item.province === name);
    console.log(province[0]);
    let total_crime = province[0].numbers;
    let crime_weight_sum = province[0].crime_weights;
    console.log(total_crime);
    console.log(crime_weight_sum);

    // if (coordinates.length > 4) {
    //   const poly = polygon([coordinates]);
    //   locations.forEach((location) => {
    //     const pt = point([location.longitude, location.latitude]);
    //     if (booleanPointInPolygon(pt, poly)) {
    //       let news_data = news_info.find(
    //         (news) => news.info_id === location.info_id
    //       );
    //       crime_weight_sum += getCrimeWeight(news_data.crime_type);
    //       total_crime += 1;
    //     }
    //   });
    // }
    console.log("=========================================================");
    console.log("จังหวัด: " + name);
    console.log("total_crime: " + total_crime);
    console.log("crime_weight_sum: " + crime_weight_sum);
    console.log("Population: " + getThailandPopulation(name));
    console.log(
      "คำนวณ: " + (crime_weight_sum / getThailandPopulation(name)) * 10
    );
    console.log("=========================================================");

    let crime_meter = (crime_weight_sum / 20 / 657575) * 1000;
    console.log(crime_meter);
    return { crime_rate: total_crime, crime_meter: crime_meter };
  }

  const getColor = (d) => {
    return d >= 100
      ? "#800026"
      : d > 75
      ? "#BD0026"
      : d > 50
      ? "#FD8D3C"
      : d > 25
      ? "#a6d96a"
      : "#198754";
  };

  const style = (feature) => {
    // console.log(
    //   "==========================feature.crime_meter=========================="
    // );
    // console.log(feature.crime_meter);
    // console.log(
    //   "==========================feature.crime_meter=========================="
    // );
    return {
      fillColor: getColor(feature.crime_meter * 100),

      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const highlightFeature = (e) => {
    const layer = e.target;
    const { ID_0, ID_1, NL_NAME_1, NAME_1 } = layer.feature.properties;
    const crime_rate = layer.feature.crime_rate;
    const crime_meter = layer.feature.crime_meter;

    setSelectedFeature({
      id_0: ID_0,
      id_1: ID_1,
      name_th: NL_NAME_1,
      name_en: NAME_1,
      crime_rate: crime_rate,
      crime_meter: crime_meter,
    });
    layer.setStyle({
      weight: 1,
      color: "black",
      fillOpacity: 1,
    });
  };

  const resetHighlight = (e) => {
    setSelectedFeature(null);
    e.target.setStyle(style(e.target.feature));
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  };

  return (
    <div
      class="sm"
      className="font-link"
      style={{ marginTop: 16, marginBottom: "5%" }}
    >
      <div className="p-1 border-2 border-gray-200 border rounded dark:border-gray-700">
        <MapContainer center={[13.751, 100.492]} zoom={5}>
          <TileLayer
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
          {/* <div
            className="absolute top-10 right-10 bg-white p-4 rounded-md shadow-md w-60  text-base"
            style={{ zIndex: 999 }}
          >
            {!selectedFeature && (
              <div style={{ fontFamily: "Kanit" }}>
                <strong>อัตราอาชญากรรมของประเทศไทย</strong> <br />
                <span>
                  เลื่อนเมาส์ไปที่แต่ละจังหวัดเพื่อดูรายละเอียดเพิ่มเติม
                </span>
              </div>
            )}
            {selectedFeature && (
              <div style={{ fontFamily: "Kanit" }} className="">
              <div>{selectedFeature.name_th}</div>
              <div>จำนวนข่าวอาชญากรรม: {selectedFeature.crime_rate}</div>
              <div>
                จำนวนประชากร {getThailandPopulation(selectedFeature.name_th)}
              </div>
            </div>
            )}
          </div> */}

          <div
            className="absolute right-10 rounded-md shadow-md w-60  text-base"
            style={{ zIndex: 999 }}
          >
            <div style={{ fontFamily: "Kanit", marginTop: 390 }}>
              <button
                class="bg-green-700 hover:bg-green-600 text-white text-xs font-bold py-2 px-4 rounded w-full"
                onClick={handleShowRank}
              >
                คลิกเพื่อดูอันดับ
              </button>
            </div>
          </div>
          {isShow && (
            <>
              <GeoJSON
                data={data}
                style={style}
                onEachFeature={onEachFeature}
              />
            </>
          )}
          {showRank && (
            <div
              className="absolute right-10 bg-white p-4 rounded-md shadow-md w-60 text-base"
              style={{ zIndex: 999, marginTop: "3%" }}
            >
              <div style={{ fontFamily: "Kanit" }}>
                <h6 style={{color: "#479B5F",fontWeight:900}}>10 อันดับจังหวัดที่มีอาชญากรรมสูงสุด</h6>
                {provinceCrimes &&
                  provinceCrimes.slice(0, 10).map((province, index) => (
                    <div>
                      {index + 1}. {province.province}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div
            className="absolute bottom-5 right-10 bg-white p-4 rounded-md shadow-md w-70 text-base"
            style={{ zIndex: 999 }}
          >
            <div style={{ fontFamily: "Kanit" }} className="legend">
              <div style={{ "--color": "#800026" }}>มีข่าวเกิดขึ้นมาก</div>
              <div style={{ "--color": "#BD0026" }}>
                มีข่าวเกิดขึ้นค่อนข้างมาก
              </div>
              <div style={{ "--color": "#FD8D3C" }}>ปกติ</div>
              <div style={{ "--color": "#a6d96a" }}>
                มีข่าวเกิดขึ้นค่อนข้างน้อย
              </div>
              <div style={{ "--color": "#198754" }}>มีข่าวเกิดขึ้นน้อย</div>
            </div>
          </div>
          <div
            className="absolute bottom-5 left-10 bg-white p-4 rounded-md w-60 shadow-md text-base"
            style={{ zIndex: 999 }}
          >
            {selectedFeature == null ? (
              <div style={{ fontFamily: "Kanit" }}>
                <strong>Crimino Meter</strong> <br />
                <span>
                  เลื่อนเมาส์ไปที่แต่ละจังหวัดเพื่อดูอัตราความรุนแรงของแต่ละจังหวัดคิดเป็นเปอร์เซ็น
                </span>
              </div>
            ) : (
              <div style={{ fontFamily: "Kanit" }}>
                <strong style={{color: "#479B5F",fontWeight:900}}>
                  Crimino Meter
                  <br />
                </strong>
                <div style={{ fontFamily: "Kanit" }} className="">
                  <div>จังหวัด{selectedFeature.name_th}</div>
                  <div>ข่าวอาชญากรรม {selectedFeature.crime_rate} ข่าว</div>
                  <div>
                    ประชากร {getThailandPopulation(selectedFeature.name_th)} คน
                  </div>
                </div>
                <br />
                <GaugeChart
                  id="gauge-chart3"
                  nrOfLevels={5}
                  colors={[
                    "#198754",
                    "#a6d96a",
                    "#FD8D3C",
                    "#BD0026",
                    "#800026",
                  ]}
                  cornerRadius={3}
                  needleBaseColor="black"
                  needleColor="red"
                  arcWidth={0.3}
                  percent={
                    selectedFeature.crime_meter > 1
                      ? 1
                      : selectedFeature.crime_meter
                  }
                  textColor={"black"}
                  // hideText={true} // If you want to hide the text
                />
              </div>
            )}
          </div>
        </MapContainer>
      </div>
    </div>
  );
}
