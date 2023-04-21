/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import L from "leaflet";
import {
  Accident,
  Battery_Assault,
  Drug,
  Gambling,
  Murder,
  SexualAbuse,
  Theft_Burglary,
} from "../../store/data/contact.js";

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
import TimeSelecter from "../TimeSelecter";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  LayersControl,
} from "react-leaflet";

import MarkerClusterGroup from "react-leaflet-cluster";

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

export default function Pinmap() {
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
  const { selectedMonths } = useSelector((state) => state.data);
  const { selectedYear } = useSelector((state) => state.data);

  useEffect(() => {
    // let earliestSelectedMonth = null;
    // let latestSelectedMonth = null;
    // let earliestStartDate = null;
    // let latestStartDate = null;
    // console.log(selectedMonths)

    // for (let i = 0; i < selectedMonths.length; i++) {
    //   const month = selectedMonths[i];
    //   if (month.isSelected === true) {
    //     if (
    //       earliestSelectedMonth === null ||
    //       month.number < earliestSelectedMonth.number
    //     ) {
    //       earliestSelectedMonth = month;
    //     }
    //     if (
    //       latestSelectedMonth === null ||
    //       month.number > latestSelectedMonth.number
    //     ) {
    //       latestSelectedMonth = month;
    //     }
    //   }
    // }
    // // console.log(earliestSelectedMonth, latestSelectedMonth)
    // if (earliestSelectedMonth !== null) {
    //   if ((selectedYear === "")) {
    //     let year = "1970";
    //     earliestStartDate = new Date(year, earliestSelectedMonth.number - 1);
    //   } else {
    //     earliestStartDate = new Date(
    //       selectedYear,
    //       earliestSelectedMonth.number - 1
    //     );
    //   }

    //   // console.log("Earliest start date:", earliestStartDate);
    // }

    // if (latestSelectedMonth !== null) {
    //   latestStartDate = new Date(
    //     selectedYear,
    //     latestSelectedMonth.number - 1,
    //     31
    //   );
    //   // console.log("Latest start date:", latestStartDate);

    //   if ((selectedYear === "")) {
    //     let year = "3000";
    //     latestStartDate = new Date(year, latestSelectedMonth.number - 1);
    //   } else {
    //     latestStartDate = new Date(
    //       selectedYear,
    //       latestSelectedMonth.number - 1,
    //       31
    //     );
    //   }
    // }
    // // console.log(earliestStartDate, latestStartDate)
    // setDateRange([earliestStartDate, latestStartDate]);
    let date_range = [];
    let earliestSelectedMonth = null;
    let latestSelectedMonth = null;
    let earliestStartDate = null;
    let latestStartDate = null;
    if (selectedYear === "") {
      let year_list = [2018, 2020, 2021];
      for (let i = 0; i < year_list.length; i++) {
        for (let j = 0; j < selectedMonths.length; j++) {
          if (selectedMonths[j].isSelected) {
            earliestStartDate = new Date(
              year_list[i],
              selectedMonths[j].number,
              1
            );
            latestStartDate = new Date(
              year_list[i],
              selectedMonths[j].number,
              31
            );
            date_range.push(earliestStartDate);
            date_range.push(latestStartDate);
          }
        }
      }
      // console.log(date_range)
      setDateRange(date_range);
    } else {
      for (let i = 0; i < selectedMonths.length; i++) {
        if (selectedMonths[i].isSelected) {
          earliestStartDate = new Date(
            selectedYear,
            selectedMonths[i].number - 1,
            1
          );
          latestStartDate = new Date(
            selectedYear,
            selectedMonths[i].number - 1,
            31
          );
          date_range.push(earliestStartDate);
          date_range.push(latestStartDate);
        }
      }
      setDateRange(date_range);
    }
    // console.log(date_range)
  }, [selectedMonths, selectedYear]);

  const dispatch = useDispatch();

  function SetView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  }

  function trimString(text) {
    return text
      .toString()
      .replace(/\['|']/g, "")
      .replaceAll("'", "")
      .trim();
  }

  function isWithinOneMonthRange(datetime) {
    for (let i = 0; i < dateRange.length; i += 2) {
      const startDate = dateRange[i];
      const endDate = dateRange[i + 1];
      if (
        Date.parse(datetime) >= Date.parse(startDate) &&
        Date.parse(datetime) <= Date.parse(endDate)
      ) {
        return true;
      }
    }
    return false;
  }

  const [mapLayers, setMapLayers] = useState({
    street: true,
    satellite: false,
    dark: false,
  });

  function PinMap() {
    const layerGroups = {};
    locations.forEach((location) => {
      const news_data = news_info.find(
        (news) => news.info_id === location.info_id
      );
      const news_datetime = news.find(
        (news) => news.news_id === news_data.news_id
      ).publish_date;
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

      isWithinOneMonthRange(news_datetime) &&
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
                  {trimString(news_datetime).split(" ")[0]
                    ? trimString(news_datetime).split(" ")[0]
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>เวลา: </span>{" "}
                  {trimString(news_datetime).split(" ")[1]
                    ? trimString(news_datetime).split(" ")[1] + " นาฬิกา"
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>ตำแหน่งที่เกิด: </span>
                  {trimString(news_data.location)
                    ? trimString(news_data.location)
                    : "ไม่มีข้อมูล"}{" "}
                </div>
                <div style={fontSize}>
                  {" "}
                  <span style={titleStyle}>เบอร์ติดต่อหากเกิดเหตุการณ์ประเภทนี้: </span>{" "}
                  {trimString(news_data.crime_type) === "Accident" ? (
                    Accident.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "Battery_Assault" ? (
                    Battery_Assault.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "Drug" ? (
                    Drug.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "Gambling" ? (
                    Gambling.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "Murder" ? (
                    Murder.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "SexualAbuse" ? (
                    SexualAbuse.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>
                      </span>
                    ))
                  ) : trimString(news_data.crime_type) === "Theft_Burglary" ? (
                    Theft_Burglary.map((data) => (
                      <span
                        key={data.id}
                        style={{
                          display: "inline",
                        }}
                      >
                        <a
                          href={"tel:" + data.callNum}
                          style={{ color: "#000000" }}
                        >
                          {data.callNum}
                        </a>{" "}
                      </span>
                    ))
                  ) : (
                    <div></div>
                  )}
                
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
        {/* ห้ามลบ */}
        {/* <Col sm className="bg-gray-50 rounded-md ">
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
        </Col> */}
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
  const [yearBarChart, setYearBarChart] = useState("all_year");
  const year_list = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023,
  ];
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
              className="absolute bottom-5 left-10 rounded-md w-60 text-base"
              style={{ zIndex: 999 }}
            >
              <DateSelect />
            </div>
          </MapContainer>
        </div>
        <TimeSelecter></TimeSelecter>
      </div>
    </>
  );
}
