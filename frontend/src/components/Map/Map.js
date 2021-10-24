import { Box, Button, Select } from '@chakra-ui/react';
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
      <Select placeholder="Select data to view">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <MapChart />
      <circle r="10vh" className=" addEvent addEventCircle" onClick={addEvent} data-tip="Create Event" data-for="registerTip">
        <div className="addIcon">
          <AddIcon />
        </div>
      </circle>
      <ReactTooltip id="registerTip" place="top" effect="solid"/>
    </div>
  );
}

export default Map;