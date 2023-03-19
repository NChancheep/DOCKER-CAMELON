import MenuController from "../components/controller/MenuController";
import React from "react";
import "../css/Sidebar.css";
import Sidebar2 from "../components/Sidebar";
import "../css/setfont.css"
function Home() {
  return (
    <main>
      <div id="outer-container">
        <Sidebar2
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
      </div>
      <MenuController />
    </main>
  );
}

export default Home;