import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/Filtter.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { change_current_location } from "./../store/Reducer";

function FiltterComponent() {
  const dispatch = useDispatch();

  const { provinces } = useSelector((state) => state.data);
  const { districts } = useSelector((state) => state.data);
  const { subdistricts } = useSelector((state) => state.data);

  const [districtList, setDistrictList] = useState([]);
  const [subdistrictList, setSubdistrictList] = useState([]);
  const [subdistrictId, setSubdistrictId] = useState();

  const getDistrictList = (province_id) => {
    const districts_list = districts.filter(
      (district) => district.province_id === parseInt(province_id)
    );
    console.log(districts_list);
    setDistrictList(districts_list);
  };

  const getSubdistrictList = (district_id) => {
    const subdistrict_list = subdistricts.filter(
      (subdistrict) => subdistrict.district_id === parseInt(district_id)
    );
    setSubdistrictList(subdistrict_list);
  };

  const getLatLong = (id) => {
    let position = subdistrictList.find(
      (subdistrict) => subdistrict.id === parseInt(id)
    );

    const user_current_location = {
      latitude: position.latitude,
      longitude: position.longitude,
    };

    dispatch(change_current_location(user_current_location));
  };

  return (
    <Row
      xs
      style={{ height: "100%", padding: 10, fontFamily: "Kanit" }}
      className="justify-content-center align-items-center"
    >
      <Col sm>
        <select
          onChange={(e) => {
            getDistrictList(e.target.value);
            console.log(districtList);
          }}
        >
          <option value="" disabled selected>
            จังหวัด
          </option>
          {provinces.map((val, key) => {
            return <option value={val.code}>{val.name_in_thai}</option>;
          })}
        </select>
      </Col>
      <Col sm>
        <select
          onChange={(e) => {
            getSubdistrictList(e.target.value);
          }}
        >
          <option value="" disabled selected>
            อำเภอ/เขต
          </option>
          {districtList.map((val, key) => {
            return <option value={val.code}>{val.name_in_thai}</option>;
          })}
        </select>
      </Col>
      <Col sm>
        <select
          onChange={(e) => {
            setSubdistrictId(e.target.value);
          }}
        >
          <option value="" disabled selected>
            เเขวง/ตำบล
          </option>
          {subdistrictList.map((val, key) => {
            return <option value={val.id}>{val.name_in_thai}</option>;
          })}
        </select>
      </Col>
      <Col>
        {" "}
        <button
          style={{ width: "100%" }}
          class="bg-white text-black hover:bg-black hover:text-white border border-black rounded"
          type="submit"
          onClick={() => {
            getLatLong(subdistrictId);
          }}
        >
          ค้นหา
        </button>
      </Col>
    </Row>
  );
}

export default FiltterComponent;
