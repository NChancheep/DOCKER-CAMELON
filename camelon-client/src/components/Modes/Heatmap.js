import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import Your_Icon from "../../assets/iconPin/ColorIcon/Your_Green.png";
import "leaflet/dist/leaflet.css";
import "../../css/Pinmap.css";

import L from "leaflet";
import "leaflet.heat";
import { useSelector } from "react-redux";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useDispatch } from "react-redux";
import { change_current_location } from "./../../store/Reducer";

const DefaultIcon = L.icon({
  iconUrl: Your_Icon,
  iconSize: [45, 59],
});



export default function Heatmap() {

  const dispatch = useDispatch();

  const { locations } = useSelector((state) => state.data);
  const { user_current_location } = useSelector((state) => state.data);
  const [showUserMarker, setShowUserMarker] = useState(false);
  const [heatLayer, setHeatLayer] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

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
          <button style={{ width: "100%", color: "white" }} onClick={getLocation}>
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
  
  const HeatMap = () => {
    const map = useMap();
    
  
    useEffect(() => {
      if (!heatLayer) { // check if heatLayer is not set
        const points = locations
          ? locations.map((location) => {
              return [location.latitude, location.longitude, 15];
            })
          : [];
  
        const newHeatLayer = L.heatLayer(points, { radius: 25, blur: 15 }).addTo(map);
        setHeatLayer(newHeatLayer); // set the state variable to the new layer
      }
  
      return () => { // cleanup function to remove the layer when component unmounts
        if (heatLayer) {
          map.removeLayer(heatLayer);
        }
      };
    }, [locations, heatLayer, map]);
  
    return null;
  };

  return (
    <>
      <div class="sm" style={{ marginTop: 16, marginBottom: "5%" }}>
        <div class="p-1 border-2 border-gray-200 border rounded dark:border-gray-700">
          <MapContainer center={[13.751, 100.492]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <HeatMap />
            <SetView
              coords={[
                user_current_location.latitude,
                user_current_location.longitude,
              ]}
            />
            <div
              className="absolute bottom-5 left-10 rounded-md w-60 text-base"
              style={{ zIndex: 999 }}
            >
               {showUserMarker && (
              <Marker
                position={[currentLocation.latitude, currentLocation.longitude]}
                icon={DefaultIcon}
              >
                <Popup>คุณอยู่แถวนี้</Popup>
              </Marker>
            )}
              <DateSelect />

            </div>
          </MapContainer>
        </div>
      </div>
    </>
  );
}
