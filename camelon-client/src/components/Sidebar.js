import React from "react";
import { slide as Menu } from "react-burger-menu";
import images from "../assets/logo1.png";
import { AiFillHome } from "react-icons/ai";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../index.css";

export default function Sidebar2() {
  return (
    <Menu>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          pointerEvents: "none",
          fontFamily: "Kanit",
        }}
      >
        <img
          src={images}
          width="51"
          alt="Camelon"
          style={{ display: "inline", paddingRight: 8 }}
        />
        Camelon
      </h1>
      <div style={{ flex: 1, height: "1px", backgroundColor: "black" }} />

      <Link
        className="menu-item"
        style={{ display: "inline", fontFamily: "Kanit" }}
        to="/"
      >
        <AiFillHome style={{ display: "inline", marginRight: 6 }} />
        หน้าแรก
      </Link>
      <br />
      <br />

      <Link
        className="menu-item"
        style={{ display: "inline", fontFamily: "Kanit" }}
        to="/Emergency"
      >
        <AiFillInfoCircle style={{ display: "inline", marginRight: 6 }} />
        เบอร์ติดต่อฉุกเฉิน
      </Link>
      <br />
      <br />
      <Link
        className="menu-item"
        style={{display: "inline", fontFamily: "Kanit"}}
        to="/contactus"
      >
        <img
          src={images}
          width="15"
          alt="Camelon"
          style={{ display: "inline", marginRight: 6 }}
        />
        เกี่ยวกับเรา
      </Link>
      <br />
      <br />
      <span
        style={{
          fontSize: 12,
          fontWeight: 400,
          pointerEvents: "none",
          color: "#474747",
          fontFamily: "Kanit",
        }}
      >
        Camelon Version 2.0.1
      </span>
    </Menu>
  );
}
