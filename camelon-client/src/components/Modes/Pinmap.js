import React, { useState, useEffect } from "react";
import L from "leaflet";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "leaflet/dist/leaflet.css";
import "../../css/Pinmap.css";
import Accident_Icon from "../../assets/iconPin/ColorIcon/Accident_Green.png";
import Assault_Icon from "../../assets/iconPin/ColorIcon/Assault_Green.png";
import Drug_Icon from "../../assets/iconPin/ColorIcon/Drugs_Green.png";
import Gambling_Icon from "../../assets/iconPin/ColorIcon/Gambling_Green.png";
import Murder_Icon from "../../assets/iconPin/ColorIcon/Murder_Green.png";
import SexualAbuse_Icon from "../../assets/iconPin/ColorIcon/Sexual_Abuse_Green.png";
import Theft_Icon from "../../assets/iconPin/ColorIcon/Theft_Green.png";
import Other_Icon from "../../assets/iconPin/ColorIcon/Other_Green.png";
import Your_Icon from "../../assets/iconPin/ColorIcon/Your_Green.png";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { change_current_location } from "./../../store/Reducer";

const DefaultIcon = L.icon({
  iconUrl: Your_Icon,
  iconSize: [45, 59],
});

function getIconForCrimeType(crimeType) {
  if (crimeType === "SexualAbuse") {
    return L.icon({
      iconUrl: SexualAbuse_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Theft_Burglary") {
    return L.icon({
      iconUrl: Theft_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Murder") {
    return L.icon({
      iconUrl: Murder_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Gambling") {
    return L.icon({
      iconUrl: Gambling_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Battery_Assault") {
    return L.icon({
      iconUrl: Assault_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Drug") {
    return L.icon({
      iconUrl: Drug_Icon,
      iconSize: [45, 59],
    });
  } else if (crimeType === "Accident") {
    return L.icon({
      iconUrl: Accident_Icon,
      iconSize: [45, 59],
    });
  } else {
    return L.icon({
      iconUrl: Other_Icon,
      iconSize: [45, 59],
    });
  }
}

function getCrimeTypeName(crimeTypeMetadata) {
  switch (crimeTypeMetadata) {
    case "SexualAbuse":
      return "การล่วงละเมิด";
    case "Murder":
      return "ฆาตกรรม";
    case "Gambling":
      return "การพนัน";
    case "Accident":
      return "อุบัติเหตุ";
    case "Theft_Burglary":
      return "ลักทรัพย์";
    case "Battery_Assault":
      return "ทำร้ายร่างกาย";
    case "Drug":
      return "ยาเสพติด";
    default:
      return "อื่นๆ";
  }
}
// L.Marker.prototype.options.icon = DefaultIcon;

// function TimeSlider() {
//   return <input type="range" min="0" max="100" />;
// }

export default function Pinmap() {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  let dateMockStart = new Date("2000-01-01T00:00:00");
  let dateMockEnd = new Date("2030-01-01T00:00:00");
  const [dateRange, setDateRange] = useState([dateMockStart, dateMockEnd]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [showUserMarker, setShowUserMarker] = useState(false);
  const [startDate, endDate] = dateRange;
  const { locations } = useSelector((state) => state.data);
  const { news_info } = useSelector((state) => state.data);
  const { news } = useSelector((state) => state.data);
  const { user_current_location } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    // var newMarker = new L.circle(coords).addTo(map);
    // var marker = L.circle(coords, 1609.34, {
    //   color: "blue",
    //   fillColor: "blue",
    // }).addTo(map);
    return null;
  }

  function trimString(text) {
    return text
      .toString()
      .replace(/\['|']/g, "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      .replace("'", "")
      
      .trim();
  }

  function showNews(datetime) {
    if (
      Date.parse(dateRange[0]) <= Date.parse(datetime) &&
      Date.parse(datetime) <= Date.parse(dateRange[1])
    ) {
      return true;
    } else {
      return false;
    }
  }

  const [mapLayers, setMapLayers] = useState({
    street: true,
    satellite: false,
    dark: false,
  });

  function PinMap() {
    const layerGroups = {};

    // Group markers based on their crime types
    locations.forEach((location) => {
      const news_data = news_info.find(
        (news) => news.info_id === location.info_id
      );
      const news_datetime = news.find(
        (news) => news.news_id === news_data.news_id
      ).publish_date;
      // console.log(showNews(news_datetime));

      const crimeType = news_data.crime_type;
      const icon = getIconForCrimeType(crimeType);
      L.Marker.prototype.options.icon = icon;
      if (!layerGroups[crimeType]) {
        layerGroups[crimeType] = [];
      }

      let button;
      const regex = /(\d+)/;
      const match = regex.exec(news_data.news_id);
      const news_id = match[1];
      if (news_data.news_id.includes("THR")) {
        button = (
          <>
            <a
              href={"https://www.thairath.co.th/news/" + news_id}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{ width: "100%" }}
                type="button"
                className="bg-gray-50 hover:bg-gray-100 text-black font-bold border py-2 px-4 rounded"
              >
                อ่านเพิ่มเติม..
              </button>
            </a>
          </>
        );
      } else {
        button = (
          <>
            <a
              href={"https://d.dailynews.co.th/crime/" + news_id}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{ width: "100%" }}
                type="button"
                className="bg-gray-50 hover:bg-gray-100 text-black font-bold border py-2 px-4 rounded"
              >
                อ่านเพิ่มเติม..
              </button>
            </a>
          </>
        );
      }

      const fontSize = { fontSize: 16, fontFamily: "Kanit" };
      const titleStyle = { fontWeight: 500, color: "#44985B" };

      showNews(news_datetime) &&
        layerGroups[crimeType].push(
          <Marker
            position={[location.latitude, location.longitude]}
            icon={icon}
          >
            <Popup>
              <div className="mb-2">
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ประเภท: </span>{" "}
                  {trimString(getCrimeTypeName(news_data.crime_type))
                    ? trimString(getCrimeTypeName(news_data.crime_type))
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ผู้กระทำ: </span>{" "}
                  {trimString(news_data.criminal)
                    ? trimString(news_data.criminal)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>การกระทำ: </span>
                  {trimString(news_data.action)
                    ? trimString(news_data.action)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ผู้รับเคราะห์: </span>
                  {trimString(news_data.victim)
                    ? trimString(news_data.victim)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ข่าววันที่: </span>{" "}
                  {trimString(news_datetime)
                    ? trimString(news_datetime)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ตำแหน่งที่เกิด: </span>
                  {trimString(news_data.location)
                    ? trimString(news_data.location)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
              </div>
              <div className="popup-action">{button}</div>
            </Popup>
          </Marker>
        );
    });

    function isNonCrime(crimeType) {
      if (crimeType === "Non_Crime") {
        return true;
      }
      return false;
    }
    const crimeTypeLayers = Object.keys(layerGroups)
      .filter((crimeType) => !isNonCrime(crimeType))
      .map((crimeType) => (
        <LayersControl.Overlay
          name={getCrimeTypeName(crimeType)}
          key={crimeType}
          checked={true}
        >
          <MarkerClusterGroup chunkedLoading>
            {layerGroups[crimeType]}
          </MarkerClusterGroup>
        </LayersControl.Overlay>
      ));

    return (
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked={mapLayers.street} name="Street">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked={mapLayers.satellite} name="Satellite">
          <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked={mapLayers.dark} name="Dark">
          <TileLayer
            attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        {crimeTypeLayers}
      </LayersControl>
    );
  }

  useEffect(() => {
    PinMap();
    // console.log("re-render pin map!");
  }, [dateRange]);

  function DateSelect() {
    return (
      <Row xs style={{ fontFamily: "Kanit" }}>
        <Col
          sm
          className="rounded-md bg-green-700 hover:bg-green-900"
          style={{
            width: "100%",
            marginBottom: "5%",
          }}
        >
          <button
            style={{ width: "100%", color: "white" }}
            onClick={getLocation}
          >
            หาตำแหน่งของฉัน
          </button>
        </Col>
        <Col sm className="bg-gray-50 rounded-md ">
          เลือกช่วงเวลาแสดงข่าว <br />
          <div className="text-red-600">*เลือกได้แค่ปี 2000 ถึง 2023</div>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </Col>
      </Row>
    );
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(changeUserLocation);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function changeUserLocation(position) {
    const user_current_location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setCurrentLocation(user_current_location);
    dispatch(change_current_location(user_current_location));
  }

  useEffect(() => {
    if (currentLocation.latitude != null && currentLocation.longitude != null) {
      setShowUserMarker(true);
    }
  }, [currentLocation]);

  return (
    <>
      {" "}
      <div class="sm" style={{ marginTop: 16, marginBottom: "5%" }}>
        <div class="p-1 border-2 border-gray-200 border rounded dark:border-gray-700">
          <MapContainer
            center={[13.751, 100.492]}
            zoom={13}
            scrollWheelZoom={true}
          >
            <SetView
              coords={[
                user_current_location.latitude,
                user_current_location.longitude,
              ]}
            />

            <PinMap />
            {showUserMarker && (
              <Marker
                position={[currentLocation.latitude, currentLocation.longitude]}
                icon={DefaultIcon}
              >
                <Popup>คุณอยู่แถวนี้</Popup>
              </Marker>
            )}
            <div
              className="absolute bottom-5 left-10 bg-gray-100 p-4 rounded-md w-60 text-base"
              style={{ zIndex: 999 }}
            >
              <DateSelect />
            </div>
          </MapContainer>
        </div>
      </div>
    </>
  );
}
