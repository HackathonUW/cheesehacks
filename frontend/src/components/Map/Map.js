import { Box } from '@chakra-ui/react';

import MapChart from "./MapChart";

import './Map.css'

function Map() {
  return (
    <div className="Map">
      <MapChart style={{height: '100%'}}/>
    </div>
  );
}

export default Map;