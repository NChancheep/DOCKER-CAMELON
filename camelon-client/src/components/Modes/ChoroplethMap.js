import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";

import { useSelector } from "react-redux";
import "../../css/ChoroplethMap.css";
import "../../css/setfont.css";
import GaugeChart from "react-gauge-chart";
import { polygon, point, booleanPointInPolygon } from "@turf/turf";

export default function ChoroplethMap() {
  const { thailandGeoJson } = useSelector((state) => state.data);
  const { locations } = useSelector((state) => state.data);
  const { news_info } = useSelector((state) => state.data);
  let features = thailandGeoJson[0].features;

  const [selectedFeature, setSelectedFeature] = useState(null);
  const [data, setData] = useState(null);
  const [isShow, setIsShow] = useState(false);

  function addCrimeRate(data) {
    return data.map((item) => ({
      ...item,
      crime_rate: getCrimeRateAndMeter(item.geometry.coordinates[0]).crime_rate,
      crime_meter: getCrimeRateAndMeter(item.geometry.coordinates[0]).crime_meter,
    }));
  }

  useEffect(() => {
    const crimeRateData = addCrimeRate(features);
    setData(crimeRateData);
  }, [features]);

  // Show pin map once data is available
  useEffect(() => {
    if (data) {
      setIsShow(true);
    }
  }, [data]);

  function getCrimeWeight(crimeTypeMetadata) {
    switch (crimeTypeMetadata) {
      case "SexualAbuse":
        return 5;
      case "Murder":
        return 8;
      case "Gambling":
        return 2;
      case "Accident":
        return 7;
      case "Theft_Burglary":
        return 6;
      case "Battery_Assault":
        return 3;
      case "Drug":
        return 4;
      default:
        return 1;
    }
  }

  function getCrimeRateAndMeter(coordinates) {
    // console.log(coordinates)
    let total_crime = 0;
    let crime_weight_sum = 0;
    if (coordinates.length > 4) {
      const poly = polygon([coordinates]);
      locations.forEach((location) => {
        const pt = point([location.longitude, location.latitude]);
        if (booleanPointInPolygon(pt, poly)) {
          let news_data = news_info.find(
            (news) => news.info_id === location.info_id
          );
          crime_weight_sum += getCrimeWeight(news_data.crime_type);
          total_crime += 1;
        }
      });
    }
    let crime_meter = crime_weight_sum/100;
    if (crime_meter > 10)
    {
      crime_meter = 10
     
    }
    return { crime_rate: total_crime, crime_meter: crime_meter };
  }

  const getColor = (d) => {
    return d >= 10
      ? "#800026"
      : d > 8
      ? "#BD0026"
      : d > 6
      ? "#E31A1C"
      : d > 4
      ? "#FC4E2A"
      : d > 2
      ? "#FD8D3C"
      : d > 1
      ? "#FEB24C"
      : "#FED976";
  };

  const style = (feature) => {
    console.log(feature)
    return {
      fillColor: getColor(feature.crime_meter),
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
      crime_meter: crime_meter
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
          <div
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
                <div>Province: {selectedFeature.name_en}</div>
                <div>{selectedFeature.name_th}</div>
                <div>Crime Index: {selectedFeature.crime_rate}</div>
                <div>ดัชนีอาชญากรรม: {selectedFeature.crime_rate}</div>
              </div>
            )}
          </div>

          {isShow && (
            <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />
          )}

          <div
            className="absolute bottom-5 left-10 bg-white p-4 rounded-md shadow-md w-70  text-base"
            style={{ zIndex: 999 }}
          >
            <div style={{ fontFamily: "Kanit" }} className="legend">
              <div style={{ "--color": "#800026" }}>อันตราย!!!</div>
              <div style={{ "--color": "#BD0026" }}>ค่อนข้างอันตรายมาก</div>
              <div style={{ "--color": "#E31A1C" }}>ค่อนข้างอันตราย</div>
              <div style={{ "--color": "#FC4E2A" }}>ปกติ</div>
              <div style={{ "--color": "#FD8D3C" }}>ค่อนข้างน้อย</div>
              <div style={{ "--color": "#FED976" }}>น้อย</div>
            </div>
          </div>
          <div
            className="absolute bottom-5 right-10 bg-white p-4 rounded-md w-60 "
            style={{ zIndex: 999 }}
          >
            {selectedFeature && (
              <GaugeChart
                id="gauge-chart3"
                nrOfLevels={6}
                colors={["green", "orange", "red"]}
                arcWidth={0.3}
                percent={selectedFeature.crime_meter/10}
                textColor={"black"}
                // hideText={true} // If you want to hide the text
              />
            )}
          </div>
        </MapContainer>
      </div>
    </div>
  );
}
