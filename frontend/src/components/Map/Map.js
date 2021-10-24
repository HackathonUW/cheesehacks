import { Box } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";

import MapChart from "./MapChart";


import './Map.css'

function Map() {
  return (
    <div className="Map">
      <MapChart />
      <ReactTooltip id="EventMarker" place="top" effect="solid"/>
    </div>
  );
}

export default Map;