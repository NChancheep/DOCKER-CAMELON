import React from "react";
import Gambling from "./Modes/emermode/Gambling";
import Murder from "./Modes/emermode/Murder";
import SexualAbuse from "./Modes/emermode/SexualAbuse";
import TheftBurglary from "./Modes/emermode/TheftBurglary";
import BatteryAssault from "./Modes/emermode/BatteryAssault";
import Drug from "./Modes/emermode/Drug";
import Accident from "./Modes/emermode/Accident";
import Overview from "./Modes/emermode/EmeOverview";

export default function NavbarEmer(props) {
  if (props.data === "Overview") {
    return <Overview/>;
  } 
  else if (props.data === "Gambling") {
    return <Gambling/>;
  } 
  else if (props.data === "Murder") {
    return <Murder />;
  } 
  else if (props.data === "SexualAbuse") {
    return <SexualAbuse />;
  } 
  else if (props.data === "TheftBurglary") {
    return <TheftBurglary />;
  }
  else if (props.data === "BatteryAssault") {
    return <BatteryAssault />;
  }
  else if (props.data === "Drug") {
    return <Drug />;
  }
  else if (props.data === "Accident") {
    return <Accident />;
  }
}
