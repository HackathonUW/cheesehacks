import { Box, Button } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom';
import addEvent from '../../images/addEvent.png'

import MapChart from "./MapChart";

import { AddIcon } from '@chakra-ui/icons';


import './Map.css'

function Map() {
  const history = useHistory();

  function addEvent() {
    history.push("/dashboard/volunteerevents");
  }

  return (
    <div className="Map">
      <MapChart />
      <ReactTooltip id="EventMarker" place="top" effect="solid"/>
        <circle r="10vh" className="addEvent" onClick={addEvent}>
          <div className="addIcon">
            <AddIcon />
          </div>
        </circle>

    </div>
  );
}

export default Map;